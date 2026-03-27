import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop — scrolls the window to the top whenever the route changes.
 * Must be rendered inside the Router (i.e. inside <Switch> context).
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);

  return null;
}
