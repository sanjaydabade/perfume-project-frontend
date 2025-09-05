'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { clientScripts } from '@lib/scripts';

// Extend the Window interface to include WOW
declare global {
  interface Window {
    WOW?: new (options?: any) => {
      init: () => void;
    };
  }
}

export default function ScriptLoader() {
  // Initialize WOW after scripts are loaded
  const handleWOWLoad = () => {
    if (typeof window !== 'undefined' && window.WOW) {
      try {
        new window.WOW().init();
      } catch (error) {
        console.error('Failed to initialize WOW.js:', error);
      }
    }
  };

  return (
    <>
      {clientScripts.map((script) => (
        <Script
          key={script.id}
          src={script.src}
          strategy="afterInteractive"
          onLoad={script.id === 'wow' ? handleWOWLoad : undefined}
        />
      ))}
      
      {/* Initialize other scripts after DOM is ready */}
      <Script id="init-scripts" strategy="afterInteractive">
        {`
          document.addEventListener('DOMContentLoaded', function() {
            // Initialize select2 if available
            if (typeof jQuery !== 'undefined' && jQuery.fn.select2) {
              try {
                jQuery('select').select2();
              } catch (error) {
                console.error('Failed to initialize select2:', error);
              }
            }
            
            // Initialize nice select if available
            if (typeof jQuery !== 'undefined' && jQuery.fn.niceSelect) {
              try {
                jQuery('select').niceSelect();
              } catch (error) {
                console.error('Failed to initialize niceSelect:', error);
              }
            }
          });
        `}
      </Script>
    </>
  );
}
