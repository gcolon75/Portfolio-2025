import React from 'react';
import './PDFViewer.css';

const PDFViewer = ({ pdfUrl, fileName = 'document.pdf' }) => {
  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-controls">
        <span className="pdf-info">Scroll to view full document</span>
        <button onClick={downloadPDF} className="pdf-control-btn" aria-label="Download PDF">
          📄 Download PDF
        </button>
      </div>

      <div className="pdf-iframe-wrapper">
        <iframe 
          src={pdfUrl}
          title="PDF Viewer"
          className="pdf-iframe"
        />
      </div>
    </div>
  );
};

export default PDFViewer;
