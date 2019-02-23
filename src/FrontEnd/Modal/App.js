import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-responsive-modal";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };
  
  class App extends React.Component {
    state = {
      open: true
    };
  
    onOpenModal = () => {
      this.setState({ open: true });
    };
  
    onCloseModal = () => {
      this.setState({ open: false });
    };
  
    render() {
      const { open } = this.state;
      return (
        <div style={styles}>
          <Modal open={open} onClose={this.onCloseModal} center>
            <h2>{titulo}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
              hendrerit risus, sed porttitor quam.
            </p>
          </Modal>
        </div>
      );
    }
  }
  
export default App;
  
