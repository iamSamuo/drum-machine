import "./App.css";
import React from "react";

const App = (props) => {
  return (
    <div id="drum-machine" className="container">
      <div id="display" className="display">
        {props.sounds.map((key) => (
          <Box text={key.key} key={key.key} audio={key.url} />
        ))}
      </div>
    </div>
  );
};

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.handlePlayAudio = this.handlePlayAudio.bind(this);
  }

  handlePlayAudio(e) {
    this.audio.current.play();
  }

  render() {
    const { text, audio } = this.props;

    return (
      <div className="box" onClick={this.handlePlayAudio}>
        {text}
        <audio ref={this.audio} className="clip" id={text} src={audio} />
      </div>
    );
  }
}

document.addEventListener("keydown", (e) => {
  const id = e.key.toUpperCase();
  const audio = document.getElementById(id);

  if (audio) {
    const parent = audio.parentNode;
    parent.classList.add("active");
    audio.play();

    audio.addEventListener("ended", () => {
      parent.classList.remove("active");
    });
  }
});

export default App;
