import React, { useEffect, useMemo, useRef, useState } from 'react';
import { renderAsync } from 'docx-preview';
import './DocumentViewer.css';
import './PDFViewer.css';

const inferFileType = (url) => {
  if (!url) return null;
  const lower = String(url).toLowerCase();
  if (lower.includes('.pdf')) return 'pdf';
  if (lower.includes('.docx')) return 'docx';
  if (lower.includes('.doc')) return 'doc';
  return null;
};

const isAbsoluteHttpUrl = (url) => /^https?:\/\//i.test(url || '');

const getCraPublicBasePath = () => {
  const publicUrl =
    (typeof process !== 'undefined' &&
      process.env &&
      typeof process.env.PUBLIC_URL === 'string')
      ? process.env.PUBLIC_URL
      : '';

  if (!publicUrl) return '/';

  try {
    const u = new URL(publicUrl);
    const p = u.pathname || '/';
    return p.endsWith('/') ? p : `${p}/`;
  } catch {
    let p = publicUrl;
    if (!p.startsWith('/')) p = `/${p}`;
    return p.endsWith('/') ? p : `${p}/`;
  }
};

const resolvePublicUrl = (maybeRelativeUrl) => {
  if (!maybeRelativeUrl) return '';
  if (isAbsoluteHttpUrl(maybeRelativeUrl)) return maybeRelativeUrl;

  const origin = window.location.origin;
  const base = getCraPublicBasePath(); // "/" or "/repo/"
  const baseNoTrailing = base.endsWith('/') ? base.slice(0, -1) : base;
  const raw = String(maybeRelativeUrl);

  // already base-prefixed
  if (baseNoTrailing && baseNoTrailing !== '/' && raw.startsWith(`${baseNoTrailing}/`)) {
    return `${origin}${raw}`;
  }

  // root-relative "/assets/..."
  if (raw.startsWith('/')) {
    if (baseNoTrailing && baseNoTrailing !== '/') return `${origin}${baseNoTrailing}${raw}`;
    return `${origin}${raw}`;
  }

  // plain relative "assets/..."
  return `${origin}${base}${raw}`;
};

export default function DocumentViewer({ fileUrl, fileType, fileName = 'document', height }) {
  const docxContainerRef = useRef(null);

  const [docxStatus, setDocxStatus] = useState('idle'); // idle | loading | ready | error
  const [docxError, setDocxError] = useState(null);

  // ✅ IMPORTANT: trust the URL extension FIRST (prevents PDF->DOCX renderer crash)
  const type = useMemo(() => {
    const inferred = inferFileType(fileUrl);
    return (inferred || fileType || '').toLowerCase();
  }, [fileUrl, fileType]);

  const isPdf = type === 'pdf';
  const isDoc = type === 'docx' || type === 'doc';

  const absolutePublicUrl = useMemo(() => resolvePublicUrl(fileUrl), [fileUrl]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!isDoc) return;

      setDocxStatus('loading');
      setDocxError(null);

      try {
        const res = await fetch(absolutePublicUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to fetch DOCX (${res.status})`);

        const buf = await res.arrayBuffer();
        if (cancelled) return;

        const el = docxContainerRef.current;
        if (!el) throw new Error('DOCX container missing');

        el.innerHTML = '';

        await renderAsync(buf, el, undefined, {
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          breakPages: true,
          renderHeaders: true,
          renderFootnotes: true,
          renderEndnotes: true,
        });

        if (!cancelled) setDocxStatus('ready');
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setDocxStatus('error');
          setDocxError(e?.message || 'Could not render DOCX');
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [isDoc, absolutePublicUrl]);

  const pdfIframeSrc = useMemo(() => {
    if (!absolutePublicUrl) return '';
    return absolutePublicUrl.includes('#')
      ? absolutePublicUrl
      : `${absolutePublicUrl}#toolbar=1&navpanes=1&scrollbar=1`;
  }, [absolutePublicUrl]);

  if (!fileUrl) {
    return (
      <div className="pdf-viewer-container">
        <div className="pdf-error">
          <p>Document file not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-viewer-container document-viewer-container">
      <div className="pdf-embed">
        {isPdf && (
          <div className="pdf-iframe-wrapper" style={height ? { height } : undefined}>
            <iframe
              className="pdf-iframe"
              src={pdfIframeSrc}
              title={fileName}
              loading="lazy"
              allow="fullscreen"
            />
          </div>
        )}

        {isDoc && (
          <div className="docx-wrapper" style={height ? { height } : undefined}>
            {docxStatus === 'loading' && <div className="docx-loading">Rendering document…</div>}

            {docxStatus === 'error' && (
              <div className="docx-error">
                <p>Couldn’t render document.</p>
                <p className="docx-error-detail">{docxError}</p>
              </div>
            )}

            <div ref={docxContainerRef} className="docx-content" />
          </div>
        )}

        {!isPdf && !isDoc && (
          <div className="pdf-fallback">
            <p>This file type can’t be embedded here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
