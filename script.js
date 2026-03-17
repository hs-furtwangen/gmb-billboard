const frameElem = document.getElementById('google-slides-iframe');
const params = new URLSearchParams(document.location.search);
const autoPlay = (params.get("auto-play") === 'true');
const slideDuration = params.get("slide-duration") || 5000;

const presentationId = `1FGLyRgIRlXaOdxa80KfoXJEbW2uRzYwAMNYo6CBS-IQ`;
const slidesURL = 'https://docs.google.com/presentation/d/e/2PACX-1vS_LeQpzmuW-7ht24cwq_ih3EjSB-RTy1_Q6rMig950jbq9YPfGyXvdzApaG2hhx_Rj5rdGTFB_aexH';
const pdfUrl = `https://docs.google.com/presentation/d/${presentationId}/export/pdf`;

if (autoPlay) {
  loadFrameAuto();
} else {
  frameElem.src = `${slidesURL}/embed`;
}

async function getNumSlides() {
  const result = await fetch(pdfUrl);
  const arrayBuffer = await result.arrayBuffer();
  const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
  return pdfDoc.getPageCount();
}

async function loadFrameAuto() {
  const numSlides = await getNumSlides();
  frameElem.src = `${slidesURL}/embed?rm=minimal&start=true&delayms=${slideDuration}&loop=false`;
  setTimeout(loadFrameAuto, numSlides * slideDuration);
}
