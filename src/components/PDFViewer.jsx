import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PDFViewer.css';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl, fileName = 'document.pdf' }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`pdf-viewer-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="pdf-controls">
        <div className="pdf-controls-group">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="pdf-control-btn"
            aria-label="Previous page"
          >
            ◀
          </button>
          <span className="pdf-page-info">
            Page {pageNumber} of {numPages || '...'}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="pdf-control-btn"
            aria-label="Next page"
          >
            ▶
          </button>
        </div>

        <div className="pdf-controls-group">
          <button onClick={zoomOut} className="pdf-control-btn" aria-label="Zoom out">
            -
          </button>
          <button onClick={resetZoom} className="pdf-control-btn" aria-label="Reset zoom">
            {Math.round(scale * 100)}%
          </button>
          <button onClick={zoomIn} className="pdf-control-btn" aria-label="Zoom in">
            +
          </button>
        </div>

        <div className="pdf-controls-group">
          <button onClick={toggleFullscreen} className="pdf-control-btn" aria-label="Toggle fullscreen">
            {isFullscreen ? '⊡' : '⊞'}
          </button>
          <button onClick={downloadPDF} className="pdf-control-btn" aria-label="Download PDF">
            ⬇
          </button>
        </div>
      </div>

      <div className="pdf-document-wrapper">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="pdf-loading">
              <div className="pdf-loading-spinner"></div>
              <p>Loading PDF...</p>
            </div>
          }
          error={
            <div className="pdf-error">
              <p>Failed to load PDF. Please check if the file exists.</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="pdf-page"
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
