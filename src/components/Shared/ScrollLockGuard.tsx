'use client';

import { useEffect } from 'react';

function resetScrollCompensation() {
  const html = document.documentElement;
  const body = document.body;
  const sbw = Math.abs(window.innerWidth - document.documentElement.clientWidth);

  const zeroComp = (el: HTMLElement) => {
    if (!el) return;
    try {
      // if element has padding-right/margin-right close to scrollbar width, zero it
      const pr = parseFloat(getComputedStyle(el).paddingRight || '0');
      const mr = parseFloat(getComputedStyle(el).marginRight || '0');
      if (pr >= sbw - 1 || el.style.paddingRight) el.style.paddingRight = '0px';
      if (mr >= sbw - 1 || el.style.marginRight) el.style.marginRight = '0px';
      if (el.style.overflow === 'hidden') el.style.overflow = 'auto';
      if (el.style.overflowY === 'hidden') el.style.overflowY = 'auto';
      el.classList.remove('with-scrollbar');
      el.removeAttribute('data-scroll-locked');
      // neutralize variable used by some libs
      el.style.setProperty('--removed-body-scroll-bar-size', '0px');
    } catch {}
  };

  // Remove scroll lock and compensation paddings/margins
  zeroComp(body as HTMLElement);
  zeroComp(html as HTMLElement);

  // Scan for any candidate elements that got compensation
  document
    .querySelectorAll<HTMLElement>(
      [
        'body',
        'html',
        "[data-scroll-locked]",
        '.react-remove-scroll',
        '.react-remove-scroll-body',
        '.react-remove-scroll-bar',
        "[style*='padding-right']",
        "[style*='margin-right']",
      ].join(', ')
    )
    .forEach(zeroComp);

  // Remove helper elements some libs insert
  document.querySelectorAll('.react-remove-scroll-bar').forEach((el) => {
    try {
      el.parentElement?.removeChild(el);
    } catch {}
  });
}

export default function ScrollLockGuard() {
  useEffect(() => {
    // Initial cleanup
    resetScrollCompensation();

    const observer = new MutationObserver(() => {
      resetScrollCompensation();
    });

    // Observe changes to <body> and <html> attributes (inline styles) and the head (style tags)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(document.head, { childList: true, subtree: true });
    // Observe dynamically created overlay containers
    document.querySelectorAll<HTMLElement>('*').forEach((el) => {
      try {
        if (el.className && /react-remove-scroll|select|popover|dialog/i.test(el.className.toString())) {
          observer.observe(el, { attributes: true, attributeFilter: ['style', 'class'] });
        }
      } catch {}
    });

    // Safety: also re-run on window resize (some libs toggle on resize)
    const onResize = () => resetScrollCompensation();
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return null;
}
