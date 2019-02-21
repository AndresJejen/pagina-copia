import React from "react";
import ReactDOM from "react-dom";

import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import style from "./style.css";

class App extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();
  
  espera(){
    const ctx = this.canvasRef.current.getContext("2d");
    const ctxwidth = ctx.canvas.width;
    var i = 0;
    var refreshIntervalId;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    const font = "30px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000000";
    const left = (ctx.canvas.width-ctx.measureText("Cargando Demo").width)/2;
    ctx.fillText("Cargando Demo", left, ctx.canvas.height/2);

    ctx.strokeStyle = "#0277bd";
    refreshIntervalId = setInterval(()=>{
      if (i <= ctxwidth){
          ctx.strokeRect(i,ctx.canvas.height/4,5,5);
          ctx.strokeRect(ctxwidth - i,ctx.canvas.height*0.75,5,5);
          i += 10;
      }
      else{
          clearInterval(refreshIntervalId);
      }
  },100)
  }

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
      this.espera();
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
          <h2>
              Video Analítica
          </h2>
          <p>
            USTEDES QUE ESCRIBIRIAN <br/>
            USTEDES QUE ESCRIBIRIAN <br/>
            USTEDES QUE ESCRIBIRIAN <br/>
            USTEDES QUE ESCRIBIRIAN <br/>
            USTEDES QUE ESCRIBIRIAN <br/>
            USTEDES QUE ESCRIBIRIAN <br/>
          </p>
          <p>
            <b>Nombre del Modelo: </b> Coco Sd - Object detection API<br/>
            <b>Autor de Modelo ML: </b> <a href="https://js.tensorflow.org">Tensorflow js</a> <br/>
            <b>Código original: </b> <a href="https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd">Github - Tensorflow js</a> <br/>
            <b>Licencia: </b> <a href="https://github.com/tensorflow/tfjs-models/blob/master/LICENSE">Apache License 2.0</a> <br/>
            <b>Nota: </b> Beitlab actua como divulgador de las tecnologias libres de tensorflow reconociendo oficialmente la originalidad de los desarrollos de terceros.<br/>
          </p>
        </aside>
      </section>
    );
  }
}

export default App;