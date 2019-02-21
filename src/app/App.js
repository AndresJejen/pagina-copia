import React from "react";
import ReactDOM from "react-dom";

import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import style from "./style.css";

class App extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();

  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        })
        .then(stream => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });
      const modelPromise = cocoSsd.load();
      console.log('Modelo cargado y listo');
      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  };

  renderPredictions = predictions => {
    const ctx = this.canvasRef.current.getContext("2d");

    ctx.canvas.width = this.videoRef.current.clientWidth;
    ctx.canvas.height = this.videoRef.current.clientHeight;
    const factor = ctx.canvas.width/600;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    predictions.forEach(prediction => {
      const x = prediction.bbox[0] * factor;
      const y = prediction.bbox[1] * factor;
      const width = prediction.bbox[2] * factor;
      const height = prediction.bbox[3] * factor;
      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    predictions.forEach(prediction => {
      const x = prediction.bbox[0]*factor;
      const y = prediction.bbox[1]*factor;
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
    });
  };

  render() {
    return (
      <section>
        <section className="Demo">
          <video
            className="style"
            autoPlay
            playsInline
            muted
            ref={this.videoRef}
            width="600"
            height="450"
          />
          <canvas
            className="style"
            ref={this.canvasRef}
          />  
        </section>
        <aside className="InfoDemo">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum dicta nulla tenetur obcaecati, perferendis nam cupiditate provident praesentium, officia inventore aut, minus beatae a quam iste quod. Culpa, vitae dolor?Esse placeat, ducimus nulla voluptatum dolores libero ratione accusamus nesciunt reiciendis inventore adipisci illum porro provident veritatis laborum laudantium nemo? Obcaecati, veniam. Fugit, quasi molestiae. Eaque laudantium deserunt minima laboriosam?
          </p>
        </aside>
      </section>
    );
  }
}

export default App;