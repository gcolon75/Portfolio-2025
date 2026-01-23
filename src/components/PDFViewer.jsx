import React, { useEffect, useMemo, useState } from 'react';

/**
 * PDFViewer
 * - Embeds a PDF using an iframe
 * - Tries to detect truly-missing assets (404)
 *
 * Notes:
 * - Some hosts (incl. GitHub Pages setups) can behave oddly with HEAD requests.
 *   We treat anything other than a confirmed 404 as "unknown" and still render the iframe.
 * - Accepts either a string URL or an object like { url }.
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
    try {
      return encodeURI(rawUrl);
    } catch {
      return rawUrl;
    }
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
        // HEAD is cheap, but treat anything except a confirmed 404 as "still try to render".
        const res = await fetch(url, { method: 'HEAD' });

        if (cancelled) return;

        if (res.status === 404) {
          setStatus('missing');
          return;
        }

        const ct = (res.headers.get('content-type') || '').toLowerCase();
        setContentType(ct);

        if (ct.includes('application/pdf') || (ct.includes('octet-stream') && looksLikePdf)) {
          setStatus('ok');
          return;
        }

        // Some hosts return text/html for HEAD even when GET serves the PDF fine.
        setStatus(looksLikePdf ? 'unknown' : 'missing');
      } catch (e) {
        if (cancelled) return;
        // If HEAD isn't supported or fails, still try to render the PDF.
        setStatus(url.toLowerCase().includes('.pdf') ? 'unknown' : 'missing');
      }
    }

    setStatus('loading');
    setContentType('');
    check();

    return () => {
      cancelled = true;
    };
  }, [url]);

  const iframeSrc = useMemo(() => {
    if (!url) return '';
    return url.includes('#') ? url : `${url}#view=FitH&toolbar=0&navpanes=0&scrollbar=1`;
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
