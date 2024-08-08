'use client';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { useAuth } from '@/contexts/AuthContext';
import SignUpForm from './login/SignUpForm';
import Loading from '@/components/loading'; // Assuming you have a Loading component
import { Button } from '@material-tailwind/react';
import Link from 'next/link';

export default function Home() {
    const [vantaEffect, setVantaEffect] = useState(null);
    const { darkMode } = useDarkMode();
    const { user, isUserLoaded } = useAuth(); // Use user and isUserLoaded from AuthContext

    useEffect(() => {
        let vantaScriptLoaded = false;

        const loadScripts = () => {
            // Check if Three.js is already loaded
            if (!window.THREE) {
                const threeScript = document.createElement('script');
                threeScript.src =
                    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
                threeScript.async = true;
                document.body.appendChild(threeScript);
                threeScript.onload = () => {
                    vantaScriptLoaded = true;
                    loadVantaScript();
                };
            } else {
                // If Three.js is already loaded, load Vanta directly
                loadVantaScript();
            }
        };

        const loadVantaScript = () => {
            if (!window.VANTA) {
                const vantaScript = document.createElement('script');
                vantaScript.src =
                    'https://unpkg.com/vanta/dist/vanta.birds.min.js';
                vantaScript.async = true;
                document.body.appendChild(vantaScript);

                vantaScript.onload = () => {
                    initializeVantaEffect();
                };
            } else {
                // Vanta is already loaded, initialize effect
                initializeVantaEffect();
            }
        };

        const initializeVantaEffect = () => {
            if (vantaEffect) {
                vantaEffect.destroy(); // Cleanup existing effect if present
            }

            const config = darkMode
                ? {
                      el: '#vanta-bg',
                      mouseControls: true,
                      touchControls: true,
                      gyroControls: false,
                      minHeight: 200.0,
                      minWidth: 200.0,
                      scale: 1.0,
                      scaleMobile: 1.0,
                  }
                : {
                      el: '#vanta-bg',
                      mouseControls: true,
                      touchControls: true,
                      gyroControls: false,
                      minHeight: 200.0,
                      minWidth: 200.0,
                      scale: 1.0,
                      scaleMobile: 1.0,
                      color1: 0xab3,
                      color2: 0x607d8b, // Remove the '#' for hexadecimal values
                      colorMode: 'variance',
                      backgroundAlpha: 0.0,
                  };

            const effect = window.VANTA.BIRDS(config);
            setVantaEffect(effect);
        };

        loadScripts();

        return () => {
            if (vantaEffect) vantaEffect.destroy(); // Cleanup Vanta effect
        };
    }, [darkMode]); // Re-run effect when darkMode changes

    return (
        <div
            id="vanta-bg"
            className={`h-screen w-screen flex flex-col justify-center items-center ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}
        >
            <h1 className="font-bold text-5xl mb-4 text-accent-light dark:text-white drop-shadow-2xl">
                Transform your life, one habit at a time.
            </h1>
            {isUserLoaded ? (
                user ? (
                    // Display content for authenticated users (if needed)
                    <div>
                        <p className="text-accent-light dark:text-white"> Welcome back, {user.displayName}! </p>
                        <Link href='/dashboard'>
                            <Button color='blue-gray'>
                                Enter Dashboard
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <SignUpForm darkMode={darkMode} />
                )
            ) : (
                <div>
                    <Loading />
                </div>
            )}
        </div>
    );
}
