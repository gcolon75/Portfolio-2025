import React from 'react';
import './PDFViewer.css';

const isPdfUrl = (url) => {
  if (!url) return false;
  return /\.pdf(\?|#|$)/i.test(url);
};

export default function PDFViewer({ pdfUrl, fileName = 'document.pdf', height }) {
  if (!pdfUrl) {
    return (
      <div className="pdf-viewer-container">
        <div className="pdf-error">
          <p>PDF file not available.</p>
        </div>
      </div>
    );
  }

  let safeUrl = pdfUrl;
  try {
    safeUrl = encodeURI(pdfUrl);
  } catch {
    safeUrl = pdfUrl;
  }

  const canEmbedPdf = isPdfUrl(safeUrl);

  const iframeSrc = canEmbedPdf
    ? `${safeUrl}#toolbar=1&navpanes=1&scrollbar=1`
    : safeUrl;

  return (
    <div className="pdf-viewer-container">
      {canEmbedPdf ? (
        <div className="pdf-embed">
          <div
            className="pdf-iframe-wrapper"
            style={height ? { height } : undefined}
          >
            <iframe
              className="pdf-iframe"
              src={iframeSrc}
              title={fileName}
              loading="lazy"
            />
          </div>
        </div>
      ) : (
        <div className="pdf-fallback">
          <p>
            This file isn&apos;t a PDF, so it can&apos;t be embedded in-browser here.
          </p>
        </div>
      )}
    </div>
  );
}
