'use client';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';  
import { useAuth } from '@/contexts/AuthContext';
import { Typography } from '@material-tailwind/react';
import SignUpForm from './login/SignUpForm';
import Loading from '@/components/loading';  // Assuming you have a Loading component

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
        threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
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
        vantaScript.src = "https://unpkg.com/vanta/dist/vanta.birds.min.js";
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
        vantaEffect.destroy();  // Cleanup existing effect if present
      }
      
      const config = darkMode 
        ? {
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
          }
        : {
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color1: 0xab3,
            color2: 0x607d8b,  // Remove the '#' for hexadecimal values
            colorMode: "variance",
            backgroundAlpha: 0.00,
          };

      const effect = window.VANTA.BIRDS(config);
      setVantaEffect(effect);
    };

    loadScripts();

    return () => {
      if (vantaEffect) vantaEffect.destroy();  // Cleanup Vanta effect
    };
  }, [darkMode]);  // Re-run effect when darkMode changes

  return (
    <div id="vanta-bg" className={`h-screen w-screen flex flex-col justify-center items-center ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
      <Typography 
        variant="h1" 
        color={darkMode ? "foreground-light" : "foreground-dark"} 
        className="font-bold text-5xl mb-4"
      >
        Transform your life, one habit at a time.
      </Typography>
      {isUserLoaded ? (
        user ? (
          // Display content for authenticated users (if needed)
          <p>Welcome back, {user.displayName}!</p>
        ) : (
          <SignUpForm darkMode={darkMode} />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}