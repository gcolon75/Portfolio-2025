import React, { useEffect, useMemo, useState } from 'react';

/**
 * PDFViewer
 * - Embeds a PDF (scrollable) using an iframe
 * - Detects missing assets on SPA hosts (where missing files often fall back to index.html)
 * - No download / open controls (embed-only)
 *
 * Defensive: accepts either a string URL or an object like { url }.
 */
export default function PDFViewer({ pdfUrl, title = 'Document' }) {
  const [status, setStatus] = useState('loading'); // loading | ok | missing | unknown
  const [contentType, setContentType] = useState('');

  const rawUrl = useMemo(() => {
    if (!pdfUrl) return '';
    if (typeof pdfUrl === 'string') return pdfUrl;
    if (typeof pdfUrl === 'object' && typeof pdfUrl.url === 'string') return pdfUrl.url;
    return String(pdfUrl);
  }, [pdfUrl]);

  const url = useMemo(() => {
    if (!rawUrl) return '';
    // encodeURI keeps slashes intact but safely escapes spaces and other characters
    return encodeURI(rawUrl);
  }, [rawUrl]);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (!url) {
        setStatus('missing');
        return;
      }

      const looksLikePdf = url.toLowerCase().includes('.pdf');

      try {
        // HEAD is cheap, but some hosts disallow it. We handle that gracefully.
        const res = await fetch(url, { method: 'HEAD' });

        if (cancelled) return;

        if (!res.ok) {
          setStatus('missing');
          return;
        }

        const ct = (res.headers.get('content-type') || '').toLowerCase();
        setContentType(ct);

        // If the host SPA falls back to index.html, this usually comes back as text/html.
        if (ct.includes('text/html')) {
          setStatus('missing');
          return;
        }

        if (ct.includes('application/pdf') || looksLikePdf) {
          setStatus('ok');
          return;
        }

        // Some hosts return application/octet-stream for PDFs; allow it if extension matches.
        if (ct.includes('octet-stream') && looksLikePdf) {
          setStatus('ok');
          return;
        }

        setStatus('unknown');
      } catch (e) {
        if (cancelled) return;
        // If HEAD isn't supported, we still try to render the iframe.
        setStatus(looksLikePdf ? 'unknown' : 'missing');
      }
    }

    setStatus('loading');
    setContentType('');
    check();

    return () => {
      cancelled = true;
    };
  }, [url]);

  // Common PDF viewer params
  const iframeSrc = useMemo(() => {
    if (!url) return '';
    // Keep the toolbar hidden and fit nicely by default.
    return `${url}#view=FitH&toolbar=0&navpanes=0&scrollbar=1`;
  }, [url]);

  return (
    <div className="pdf-embed-shell">
      {status === 'missing' ? (
        <div className="pdf-missing">
          <strong>Missing PDF asset.</strong>
          <div style={{ marginTop: '0.4rem' }}>
            Expected: <code>{rawUrl || '(empty url)'}</code>
          </div>
          <div style={{ marginTop: '0.6rem' }}>
            If you&apos;re seeing your portfolio inside this box, the PDF URL is 404ing and your host is
            falling back to <code>index.html</code>.
          </div>
        </div>
      ) : (
        <>
          {status === 'unknown' && (
            <div className="pdf-note">
              Couldn&apos;t verify the file type{contentType ? ` (${contentType})` : ''}. If this looks wrong,
              double-check the asset path/casing.
            </div>
          )}

          <iframe className="pdf-embed" src={iframeSrc} title={title} loading="lazy" />
        </>
      )}
    </div>
  );
}
