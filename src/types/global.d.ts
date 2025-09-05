// Extend the Window interface to include WOW and other global variables
declare global {
  interface Window {
    $: any;
    jQuery: any;
    WOW: new (options?: any) => {
      init: () => void;
    };
  }

  // Declare jQuery for TypeScript
  const $: any;
  const jQuery: any;
  
  // Declare WOW for TypeScript
  const WOW: new (options?: any) => {
    init: () => void;
  };
}

export {}; // This file needs to be a module
