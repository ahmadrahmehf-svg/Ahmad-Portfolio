import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function downloadPortfolioPdf(fileName: string) {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Portfolio root element was not found.');

  const canvas = await html2canvas(rootElement, {
    backgroundColor: '#020617',
    scale: Math.max(2, Math.min(window.devicePixelRatio || 1, 3)),
    useCORS: true,
    logging: false,
    windowWidth: document.documentElement.scrollWidth,
    windowHeight: document.documentElement.scrollHeight,
  });

  const pdf = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
    compress: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 24;
  const usableWidth = pageWidth - margin * 2;
  const usableHeight = pageHeight - margin * 2;
  const scaleRatio = usableWidth / canvas.width;
  const pageHeightPx = Math.max(1, Math.floor(usableHeight / scaleRatio));

  let sourceY = 0;
  let pageIndex = 0;

  while (sourceY < canvas.height) {
    const sliceHeight = Math.min(pageHeightPx, canvas.height - sourceY);
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;

    const pageContext = pageCanvas.getContext('2d');
    if (!pageContext) break;

    pageContext.drawImage(
      canvas,
      0,
      sourceY,
      canvas.width,
      sliceHeight,
      0,
      0,
      canvas.width,
      sliceHeight
    );

    if (pageIndex > 0) pdf.addPage();

    pdf.addImage(
      pageCanvas.toDataURL('image/png'),
      'PNG',
      margin,
      margin,
      usableWidth,
      sliceHeight * scaleRatio,
      undefined,
      'FAST'
    );

    sourceY += sliceHeight;
    pageIndex += 1;
  }

  pdf.save(fileName);
}
