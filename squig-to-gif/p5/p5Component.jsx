import React from "react";
import p5 from "p5";
import animationLoop from '../createLoop/animationLoop';
import gifLoop from '../createLoop/gifLoop';


// NOTE: assigning p5 to window because someone can need it globally to use in others libraries
if (typeof window !== "undefined") {
  window.p5 = p5;
}

export const p5Events = [
  "draw",
  "windowResized",
  "preload",
  "mouseClicked",
  "doubleClicked",
  "mouseMoved",
  "mousePressed",
  "mouseWheel",
  "mouseDragged",
  "mouseReleased",
  "keyPressed",
  "keyReleased",
  "keyTyped",
  "touchStarted",
  "touchMoved",
  "touchEnded",
  "deviceMoved",
  "deviceTurned",
  "deviceShaken",
];

export function createLoop({
    duration = 3,
    framesPerSecond = 30,
    gif = false,
    gifRender = undefined,
    gifOpen = undefined,
    gifDownload = undefined,
    gifStartLoop = undefined,
    gifEndLoop = undefined,
    gifFileName = undefined,
    gifOnFinishRender = undefined,
    gifOptions = undefined,
    canvas = undefined,
  } = {}) {
    const loop = {}
    animationLoop({ framesPerSecond, duration, loop });
    if (gif !== false) {
        gif = gif === true ? {} : gif
        if (canvas !== undefined) gif.canvas = canvas
        if (gifRender !== undefined) gif.render = gifRender
        if (gifOpen !== undefined) gif.open = gifOpen
        if (gifDownload !== undefined) gif.download = gifDownload
        if (gifStartLoop !== undefined) gif.startLoop = gifStartLoop
        if (gifOptions !== undefined) gif.options = gifOptions
        if (gifEndLoop !== undefined) gif.endLoop = gifEndLoop
        if (gifFileName !== undefined) gif.fileName = gifFileName
        if (gifOnFinishRender !== undefined) gif.onFinishRender = gifOnFinishRender
        gifLoop(loop, gif)
    }
    return loop
  }

export default class Sketch extends React.Component {
  constructor(props) {
    super(props);
    this.canvasParentRef = React.createRef();
  }

  componentDidMount() {
    this.sketch = new p5((p) => {
      p.setup = () => {
        this.props.setup(p, this.canvasParentRef.current);
      };

      
      p5Events.forEach((event) => {
        if (this.props[event]) {
          p[event] = (...rest) => {
            this.props[event](p, ...rest);
          };
        }
      });
      
      this.createLoop({ duration: 3, gif: true });  
    });

  }

  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    this.sketch.remove();
  }
  render() {
    return (
      <div
        ref={this.canvasParentRef}
        className={this.props.className || "react-p5"}
        data-testid="react-p5"
        style={this.props.style || {}}
      />
    );
  }
}