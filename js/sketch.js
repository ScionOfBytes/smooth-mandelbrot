let canvas = document.getElementById('fractal')
const { width, height } = canvas.getBoundingClientRect();
const bounds = { x: { min: -3, max: 2 }, y: { min: -1.3, max: 1.3 } }

function setup() {
    canvas.width = width
    canvas.height = height
    bounds.y.max = .5 * (bounds.x.max - bounds.x.min) * height / width;
    bounds.y.min = -.5 * (bounds.x.max - bounds.x.min) * height / width;

    document.addEventListener('keydown', zoomListener, false);
    document.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('click', clickListener, { passive: true });

    const message = { message: 'setup', canvas };
    painter_setup(message)

    log('setup done')
}

function clickListener(e) {
    painter_zoom_on(e.offsetX, e.offsetY, .75);
}

function zoomListener(event) {

    if (event.altKey && event.keyCode === 38 || event.keyCode === 40) {

        event.preventDefault()

        let zoom = 0.25
        if (event.keyCode === 38) zoom = -zoom;

        painter_zoom(zoom)
    }
}

function onWheel(e) {
    e.preventDefault();
    painter_zoom_on(e.offsetX, e.offsetY, 1 + e.deltaY / 100)
}

setup()
