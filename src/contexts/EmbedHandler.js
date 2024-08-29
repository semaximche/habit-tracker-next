'use client';
import { useEffect, useCallback, useState } from 'react';

const EmbedHandler = () => {
  const [lastHeight, setLastHeight] = useState(0);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const sendHeightToParent = useCallback(() => {
    const currentHeight = Math.min(document.body.offsetHeight, 200); // Adjust the max height as needed
    if (Math.abs(currentHeight - lastHeight) > 10) { // Only update if height changes significantly
      setLastHeight(currentHeight);
      console.log(`Sending height: ${currentHeight}`); // Debugging line
      window.parent.postMessage({ type: 'myApp', action: 'setHeight', currentHeight }, '*');
    }
  }, [lastHeight]);

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

    // Send height after a short delay to allow initial render
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
