import Script from 'next/script';

export default function MTWSupport() {
    return (
        <Script id="mtw-support-script">
            {`
            // ping
            const origin = window.location.href;
            if (origin.indexOf('://localhost') === -1 && origin.indexOf('://127.0.0.1') === -1) {
                fetch(\`https://api.mtw-testnet.com/app/ping?url=\${encodeURIComponent(origin)}\`)
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error(error));
            }

            // set theme
            const toggle = () => {
                document.documentElement.classList.toggle("dark");
                document.documentElement.classList.toggle("light");
                document.body.classList.toggle("dark");
                document.body.classList.toggle("light");
            };

            const setTheme = async (theme) => {
                if (!document.documentElement.classList.contains("dark") && !document.documentElement.classList.contains("light")) {
                    document.documentElement.classList.add(theme);
                    document.body.classList.add(theme);
                } else {
                    if (!document.documentElement.classList.contains(theme)) {
                        toggle();
                    }
                }
            };

            // Listen for messages from the parent page
            let lastHeight = 0;
            const sendHeightToParent = () => {
                const height = document.body.scrollHeight;
                if (height !== lastHeight) {
                    lastHeight = height;
                    console.log("Sending height:", height); // Debugging line
                    window.parent.postMessage({ type: 'myApp', action: 'setHeight', height }, '*');
                }
            };

            let tempTheme = 'light';
            window.addEventListener('message', (event) => {
                if (event.data === 'requestHeight') {
                    sendHeightToParent();
                }
                if (event.data.action === 'setTheme') {
                    setTheme(event.data.theme);
                }
                if (event.data.action === 'privateApi' && typeof acceptPrivateApiResponse !== 'undefined') {
                    acceptPrivateApiResponse(event.data);
                }
            });

            document.addEventListener("DOMContentLoaded", function () {
                // Check if dark mode is enabled on the system
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    // dark mode is enabled, update your HTML or body class
                    document.documentElement.classList.add('dark');
                    document.body.classList.add('dark');
                    console.log('dark mode is enabled');
                }
            });

            // send custom style to parent
            if (typeof mtwAppConfig !== 'undefined' && mtwAppConfig) {
                window.parent.postMessage({ type: 'myApp', action: 'customConfig', config: mtwAppConfig }, '*');
            }

            // send request to parent - private API
            const sendRequestToParent = (data) => {
                window.parent.postMessage({ type: 'myApp', action: 'privateApi', ...data }, '*');
            };

            // Call it immediately
            setTimeout(sendHeightToParent, 100);

            // Optional: Monitor changes to the content's height with throttling
            let resizeTimeout;
            const resizeObserver = new ResizeObserver(() => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    sendHeightToParent();
                }, 200); // Adjust the timeout value as needed
            });
            resizeObserver.observe(document.body);
            `}
        </Script>
    );
}
