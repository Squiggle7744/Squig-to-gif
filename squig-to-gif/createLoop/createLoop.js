import animationLoop from './animationLoop';
import gifLoop from './gifLoop';
export default createLoop

function createLoop({
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


    console.log(loop)
    return loop
}