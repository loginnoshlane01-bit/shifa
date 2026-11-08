/**
 * Utility functions for exporting vector SVG and ultra-high-resolution PNG assets
 */

const FONT_EMBED_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');
  text {
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
  }
`;

export function serializeCleanSvg(svgElement: SVGSVGElement, removeGuides = true): string {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;

  if (removeGuides) {
    const guides = clone.querySelector('[data-guides="true"]');
    if (guides) {
      guides.remove();
    }
  }

  // Ensure mandatory namespaces
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

  // Embed font stylesheet inside defs
  let defs = clone.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    clone.insertBefore(defs, clone.firstChild);
  }

  const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleEl.textContent = FONT_EMBED_STYLE;
  defs.appendChild(styleEl);

  const serializer = new XMLSerializer();
  const rawString = serializer.serializeToString(clone);
  return `<?xml version="1.0" encoding="UTF-8"?>\n${rawString}`;
}

export function downloadSvgFile(svgElement: SVGSVGElement, filename = 'shifa-clothing-logo.svg'): void {
  const svgString = serializeCleanSvg(svgElement, true);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copySvgCodeToClipboard(svgElement: SVGSVGElement): Promise<boolean> {
  try {
    const svgString = serializeCleanSvg(svgElement, true);
    await navigator.clipboard.writeText(svgString);
    return true;
  } catch (err) {
    console.error('Failed to copy SVG to clipboard:', err);
    return false;
  }
}

export async function downloadPngImage(
  svgElement: SVGSVGElement,
  filename = 'shifa-clothing-logo-4k.png',
  dimension = 4000
): Promise<void> {
  const svgString = serializeCleanSvg(svgElement, true);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const viewBox = svgElement.viewBox.baseVal;
        const aspect = viewBox && viewBox.width > 0 && viewBox.height > 0
          ? viewBox.width / viewBox.height
          : 1;

        let canvasWidth = dimension;
        let canvasHeight = dimension;

        if (aspect >= 1) {
          canvasWidth = dimension;
          canvasHeight = Math.round(dimension / aspect);
        } else {
          canvasHeight = dimension;
          canvasWidth = Math.round(dimension * aspect);
        }

        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('Canvas 2D context unavailable'));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image directly onto canvas
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        URL.revokeObjectURL(url);

        canvas.toBlob((pngBlob) => {
          if (!pngBlob) {
            reject(new Error('PNG conversion failed'));
            return;
          }
          const pngUrl = URL.createObjectURL(pngBlob);
          const link = document.createElement('a');
          link.href = pngUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pngUrl);
          resolve();
        }, 'image/png');
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to rasterize SVG into image: ${e}`));
    };

    img.src = url;
  });
}
