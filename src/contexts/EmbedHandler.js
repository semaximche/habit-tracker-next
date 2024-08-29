'use client';
import { useEffect } from 'react';

const EmbedHandler = () => {
  useEffect(() => {
    const sendHeightToParent = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ type: 'myApp', action: 'setHeight', height }, '*');
    };

    const handleMessage = (event) => {
      if (event.data === 'requestHeight') {
        sendHeightToParent();
      }
      if (event.data.action === 'setTheme') {
        // You can handle theme setting here if needed
      }
    };

    window.addEventListener('message', handleMessage);

    // Send height immediately and after a short delay
    sendHeightToParent();
    setTimeout(sendHeightToParent, 100);

    // Set up ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      sendHeightToParent();
    });
    resizeObserver.observe(document.body);

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
      resizeObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default EmbedHandler;