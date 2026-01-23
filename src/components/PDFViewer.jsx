import React, { useEffect, useMemo, useState } from 'react';

/**
 * PDFViewer
 * - Embeds a PDF (scrollable) using an iframe
 * - Tries to detect “SPA fallback to index.html” without false positives
 * - Defensive props: accepts pdfUrl OR url OR src (string or { url })
 */

function extractUrl(input) {
  if (!input) return '';
  if (typeof input === 'string') return input;
  if (typeof input === 'object') {
    if (typeof input.url === 'string') return input.url;
    if (typeof input.href === 'string') return input.href;
    if (typeof input.src === 'string') return input.src;
  }
  return String(input);
}

function safeEncode(u) {
  try {
    return encodeURI(u);
  } catch {
    return u;
  }
}

function startsWithPdfSignature(buf) {
  if (!buf || buf.byteLength < 4) return false;
  const u8 = new Uint8Array(buf.slice(0, 4));
  const sig = String.fromCharCode(u8[0], u8[1], u8[2], u8[3]);
  return sig === '%PDF';
}

export default function PDFViewer({ pdfUrl, url, src, title = 'Document' }) {
  const [status, setStatus] = useState('loading'); // loading | ok | missing | unknown
  const [contentType, setContentType] = useState('');

  const rawUrl = useMemo(() => {
    return (extractUrl(pdfUrl) || extractUrl(url) || extractUrl(src) || '').trim();
  }, [pdfUrl, url, src]);

  const encodedUrl = useMemo(() => (rawUrl ? safeEncode(rawUrl) : ''), [rawUrl]);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (!encodedUrl) {
        setStatus('missing');
        return;
      }

      const looksLikePdf = rawUrl.toLowerCase().includes('.pdf');

      // 1) Quick HEAD check: only treat a hard 404 as missing.
      try {
        const head = await fetch(encodedUrl, { method: 'HEAD', cache: 'no-store' });
        if (cancelled) return;

        const ct = (head.headers.get('content-type') || '').toLowerCase();
        setContentType(ct);

        if (head.status === 404) {
          setStatus('missing');
          return;
        }

        if (head.ok && (ct.includes('application/pdf') || (ct.includes('octet-stream') && looksLikePdf))) {
          setStatus('ok');
          return;
        }
        // Don’t mark missing just because ct is text/html — we verify by signature below.
      } catch {
        // ignore and fall through
      }

      // 2) Byte sniff: grab the first chunk and look for %PDF
      try {
        const res = await fetch(encodedUrl, {
          method: 'GET',
          cache: 'no-store',
          headers: { Range: 'bytes=0-1023' }
        });

        if (cancelled) return;

        if (res.status === 404) {
          setStatus('missing');
          return;
        }

        if (!res.ok) {
          setStatus(looksLikePdf ? 'unknown' : 'missing');
          return;
        }

        const buf = await res.arrayBuffer();
        if (cancelled) return;

        if (startsWithPdfSignature(buf)) {
          setStatus('ok');
          return;
        }

        // Not a PDF signature (often index.html fallback on SPA hosts).
        setStatus(looksLikePdf ? 'missing' : 'unknown');
      } catch {
        if (cancelled) return;
        setStatus(looksLikePdf ? 'unknown' : 'missing');
      }
    }

    setStatus('loading');
    setContentType('');
    check();

    return () => {
      cancelled = true;
    };
  }, [encodedUrl, rawUrl]);

  const iframeSrc = useMemo(() => {
    if (!encodedUrl) return '';
    const base = encodedUrl.split('#')[0];
    return `${base}#view=FitH&toolbar=0&navpanes=0&scrollbar=1`;
  }, [encodedUrl]);

  return (
    <div className="pdf-embed-shell">
      {status === 'missing' ? (
        <div className="pdf-missing">
          <strong>Missing PDF asset.</strong>
          <div style={{ marginTop: '0.4rem' }}>
            Expected: <code>{rawUrl || '(empty url)'}</code>
          </div>
          <div style={{ marginTop: '0.6rem' }}>
            If you&apos;re seeing your portfolio inside this box, the PDF URL is failing and your host is falling back to{' '}
            <code>index.html</code>.
          </div>
        </div>
      ) : (
        <>
          {status === 'unknown' && (
            <div className="pdf-note">
              Couldn&apos;t verify the file type{contentType ? ` (${contentType})` : ''}. If this looks wrong, double-check the
              asset path/casing.
            </div>
          )}

          <iframe className="pdf-embed" src={iframeSrc} title={title} loading="lazy" />
        </>
      )}
    </div>
  );
}
