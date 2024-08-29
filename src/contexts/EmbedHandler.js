'use client';
import { useEffect, useCallback } from 'react';

const EmbedHandler = () => {
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const sendHeightToParent = useCallback(() => {
    const height = Math.min(document.body.offsetHeight, 1000); // Adjust to use offsetHeight
    console.log(`Sending height: ${height}`); // Debugging line
    window.parent.postMessage({ type: 'myApp', action: 'setHeight', height }, '*');
  }, []);

  const debouncedSendHeight = useCallback(debounce(sendHeightToParent, 200), [sendHeightToParent]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'requestHeight') {
        sendHeightToParent();
      } else if (event.data.action === 'setTheme') {
        // Handle theme setting if needed
      }
    };

    window.addEventListener('message', handleMessage);

    // Initial height send
    setTimeout(sendHeightToParent, 100);

    // Set up ResizeObserver
    const resizeObserver = new ResizeObserver(debouncedSendHeight);
    resizeObserver.observe(document.body);

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
      resizeObserver.disconnect();
    };
  }, [sendHeightToParent, debouncedSendHeight]);

  return null; // This component doesn't render anything
};

export default EmbedHandler;
