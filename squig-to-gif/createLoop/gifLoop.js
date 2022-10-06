
//This module does not add anything to the loop instance
// it does attach itsself to loop events onLoop and onPostRender

import GIF from '../gif/gif';
import workerScript from './gifWorkerScript';

export default gifLoop

function gifLoop(loop, {
    render = true,
    open = false,
    download = true,
    startLoop = 0,
    endLoop = 1,
    fileName = "squig.gif",
    onFinishRender = undefined,	
    canvas = document.getElementsByTagName('canvas')[0],
    options = {},
} = {}) {

    const ctx = canvas.getContext('2d')

    if (canvas === undefined) {
        console.error('GIF module: no canvas found');
        return
    }
    const gifjs = new GIF(Object.assign({
        workerScript,
    }, options));


    let isFinished = false
    let renderStartTime = undefined

    loop.onLoop.addListener(handleNewLoop)

    function handleNewLoop() {
        if (loop.elapsedLoops === startLoop)
            startRecording()
        else if (loop.elapsedLoops === endLoop)
            startRendering()
    }

    //some reason this is getting called twice
    gifjs.on('finished', onFinishedRendering)

    const gifTotalFrameCount = loop.framesPerLoop * (endLoop - startLoop)
    //FUNCTIONS ---------------------------------------------------------------------
    function startRecording() {
        console.log(`creating GIF with ${gifTotalFrameCount} frames`);
        loop.onPostRender.addListener(addFrame)
    }


    function addFrame() {
        console.log(`adding frame ${loop.elapsedFrames}`);
        if (ctx.getImageData(0,0,5,5).data[0] != 0) {
            gifjs.addFrame(canvas, { copy: true, delay: loop.frameDeltaTime })
        }
    }

    function startRendering() {
        // console.log(loop.onPostRender._listeners[0].toString())
        loop.onPostRender.removeListener(addFrame)
        loop.onLoop.removeListener(handleNewLoop)
        console.log(`rendering GIF`);
        renderStartTime = Date.now()
        gifjs.render()
    }

    function onFinishedRendering(blob) {
        if (isFinished)
            return
        isFinished = true
        const renderTime = Date.now() - renderStartTime
        console.log(
            `finished rendering GIF
                    render time: ${(renderTime / 1000).toFixed(1)} seconds
                    approx size: ${(blob.size / 1000).toFixed(0)} kb
                    frame count: ${gifTotalFrameCount}
                    frame delay: ${loop.frameDeltaTime.toFixed(1)} ms
                    `);
        const imgUrl = URL.createObjectURL(blob)
        if (render) {
            loop.onLoop.addListener(renderOnLoop)
            function renderOnLoop() {
                loop.onLoop.removeListener(renderOnLoop)
                // renderImage(imgUrl, fileName)
            }
        }
        if (onFinishRender && typeof onFinishRender === "function") 
            onFinishRender(blob)
        if (open)
            window.open(imgUrl)
        if (download)
            downloadImage(imgUrl, fileName)
        // URL.revokeObjectURL(imgUrl)
    }

}


function renderImage(blobUrl, fileName) {
    // return new Promise((resolve, reject) => {
    const a = document.createElement('a')
    a.download = fileName
    document.body.appendChild(a)
    const img = document.createElement('img')
    // img.addEventListener('load', resolve)
    img.src = blobUrl
    a.href = img.src
    // img.setAttribute('href', blobUrl)
    // img.setAttribute('download', "image.gif")
    a.appendChild(img)
};

function downloadImage(blobUrl, fileName) {
    const elt = document.createElement('a')
    elt.style.display = 'none'
    elt.href = blobUrl
    elt.download = fileName
    document.body.appendChild(elt)
    elt.click()
    document.body.removeChild(elt)
}