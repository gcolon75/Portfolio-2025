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
          📄 <strong>View this document:</strong> For the best experience, open the PDF in a new tab or download it directly.
        </p>
        <div className="pdf-button-group">
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="pdf-control-btn primary"
          >
            🔗 Open PDF in New Tab
          </a>
          <button onClick={downloadPDF} className="pdf-control-btn secondary" aria-label="Download PDF">
            📥 Download PDF
          </button>
        </div>
      </div>

      <div className="pdf-notice">
        <p className="notice-text">
          ℹ️ <strong>Note:</strong> Some browsers may block embedded PDFs. Use the buttons above to view the document.
        </p>
      </div>
    </div>
  );
};

export default PDFViewer;
