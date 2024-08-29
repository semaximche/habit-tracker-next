'use client';
import { useEffect, useRef } from 'react';

const EmbedHandler = () => {
  const prevHeightRef = useRef(0);

  useEffect(() => {
    const sendHeightToParent = () => {
      const currentHeight = document.body.scrollHeight;
      if (currentHeight !== prevHeightRef.current) {
        window.parent.postMessage({ type: 'myApp', action: 'setHeight', height: currentHeight }, '*');
        prevHeightRef.current = currentHeight;
      }
    };

    const handleMessage = (event) => {
      if (event.data === 'requestHeight') {
        sendHeightToParent();
      }
      if (event.data.action === 'setTheme') {
        // Implement theme setting logic here if needed
      }
    };

    window.addEventListener('message', handleMessage);

    // Send height after a short delay to ensure content is rendered
    setTimeout(sendHeightToParent, 100);

    // Set up ResizeObserver with debounce
    let resizeTimer;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(sendHeightToParent, 100);
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('message', handleMessage);
      resizeObserver.disconnect();
      clearTimeout(resizeTimer);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default EmbedHandler;