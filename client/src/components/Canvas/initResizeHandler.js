import throttle from '../../helpers/throttle';

function initResizeHandler (container, setCanvasArea) {
    const resizeHandler = throttle(() => {
        setCanvasArea({
            height: container.clientHeight,
            width: container.clientWidth
            
        })
    }, 1000);
    resizeHandler();
    window.addEventListener('resize', resizeHandler)
}

export default initResizeHandler;