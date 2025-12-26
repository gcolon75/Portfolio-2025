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
        <span className="pdf-info" id="pdf-instructions">Scroll to view full document</span>
        <button onClick={downloadPDF} className="pdf-control-btn" aria-label="Download PDF">
          📄 Download PDF
        </button>
      </div>

      <div className="pdf-iframe-wrapper">
        <iframe 
          src={pdfUrl}
          title="PDF Viewer"
          className="pdf-iframe"
          sandbox="allow-same-origin allow-scripts allow-popups"
          referrerPolicy="no-referrer"
          loading="lazy"
          aria-describedby="pdf-instructions"
        />
      </div>
    </div>
  );
};

export default PDFViewer;
