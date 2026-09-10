import { useEffect } from 'react';

/**
 * Attaches Intersection Observer to all `.reveal`, `.reveal-left`, `.reveal-right`
 * elements and adds the `.visible` class when they enter the viewport.
 * Automatically observes dynamic React elements added via filter/sort state updates.
 */
export const useScrollReveal = (deps: any[] = []) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px' }
    );

    const scanAndObserve = () => {
      const els = document.querySelectorAll(
        '.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)'
      );
      els.forEach((el) => observer.observe(el));
    };

    // Initial scan
    scanAndObserve();

    // MutationObserver guarantees newly mounted React nodes (filtered lists) get observed instantly
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, deps);
};
