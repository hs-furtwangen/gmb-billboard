const frameElem = document.getElementById('iframe');

setInterval(reloadFrame, 20000);

function reloadFrame() {
  frameElem.src += '';
}
