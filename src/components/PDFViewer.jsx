import React from 'react';
import './PDFViewer.css';

const isPdfUrl = (url) => {
  if (!url) return false;
  // Supports ".pdf", ".pdf?x=", ".pdf#page=", etc.
  return /\.pdf(\?|#|$)/i.test(url);
};

export default function PDFViewer({ pdfUrl, fileName = 'document.pdf', height }) {
  // Validate pdfUrl
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
  } catch (e) {
    // If encodeURI fails for any reason, fall back to raw string
    safeUrl = pdfUrl;
  }

  const canEmbedPdf = isPdfUrl(safeUrl);

  // Hint Chrome/Edge PDF viewer to show the toolbar/nav where supported.
  // (Some browsers ignore these; harmless if they do.)
  const iframeSrc = canEmbedPdf
    ? `${safeUrl}#toolbar=1&navpanes=1&scrollbar=1`
    : safeUrl;

  const downloadPDF = () => {
    try {
      const link = document.createElement('a');
      link.href = safeUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-controls">
        <p className="pdf-info">
          <span role="img" aria-label="doc">📄</span>{' '}
          <strong>View this document:</strong> If embedding is blocked, use the buttons below.
        </p>

        <div className="pdf-button-group">
          <a
            href={safeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-control-btn primary"
          >
            Open in New Tab
          </a>

          <button
            type="button"
            onClick={downloadPDF}
            className="pdf-control-btn secondary"
            aria-label="Download file"
          >
            Download
          </button>
        </div>
      </div>

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
            Use the buttons above to open or download it.
          </p>
        </div>
      )}
    </div>
  );
}
