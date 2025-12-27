import React from 'react';
import './PDFViewer.css';

const PDFViewer = ({ pdfUrl, fileName = 'document.pdf' }) => {
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

  const downloadPDF = () => {
    try {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-controls">
        <p className="pdf-info">
          This document is best viewed by downloading. Click the button below to download the PDF.
        </p>
        <button onClick={downloadPDF} className="pdf-control-btn primary" aria-label="Download PDF">
          📄 Download PDF
        </button>
        <a 
          href={pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pdf-control-btn secondary"
        >
          🔗 Open in New Tab
        </a>
      </div>

      <div className="pdf-iframe-wrapper">
        <object 
          data={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          type="application/pdf"
          className="pdf-iframe"
          aria-label="PDF Document Viewer"
        >
          <div className="pdf-fallback">
            <p className="fallback-message">
              Your browser doesn't support embedded PDF viewing.
            </p>
            <button onClick={downloadPDF} className="pdf-control-btn primary">
              📄 Download PDF
            </button>
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="pdf-control-btn secondary"
            >
              🔗 Open in New Tab
            </a>
          </div>
        </object>
      </div>
    </div>
  );
};

export default PDFViewer;
