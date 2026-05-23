type Html2CanvasFn = (
  element: HTMLElement,
  options?: Record<string, unknown>
) => Promise<HTMLCanvasElement>;

interface JsPdfInstance {
  internal: {
    pageSize: {
      getWidth: () => number;
      getHeight: () => number;
    };
  };
  addPage: () => void;
  addImage: (
    imageData: string,
    format: string,
    x: number,
    y: number,
    width: number,
    height: number,
    alias?: string,
    compression?: string
  ) => void;
  save: (fileName: string) => void;
}

interface JsPdfConstructor {
  new (options: { orientation: string; unit: string; format: string; compress: boolean }): JsPdfInstance;
}

declare global {
  interface Window {
    html2canvas?: Html2CanvasFn;
    jspdf?: {
      jsPDF: JsPdfConstructor;
    };
  }
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;

    if (existingScript?.dataset.loaded === 'true') {
      resolve();
      return;
    }

    const script = existingScript ?? document.createElement('script');
    script.src = src;
    script.async = true;
    script.crossOrigin = 'anonymous';

    const handleLoad = () => {
      script.dataset.loaded = 'true';
      resolve();
    };

    const handleError = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });

    if (!existingScript) {
      document.head.appendChild(script);
    }
  });
}

async function ensurePdfLibraries() {
  await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
  await loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');

  if (!window.html2canvas || !window.jspdf?.jsPDF) {
    throw new Error('PDF libraries are not available.');
  }

  return {
    html2canvas: window.html2canvas,
    jsPDF: window.jspdf.jsPDF,
  };
}

export async function downloadPortfolioPdf(fileName: string) {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Portfolio root element was not found.');

  const { html2canvas, jsPDF } = await ensurePdfLibraries();

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
