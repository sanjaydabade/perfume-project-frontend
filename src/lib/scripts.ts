// List of all scripts to be loaded on the client side
export const clientScripts = [
  // Core
  { src: 'https://code.jquery.com/jquery-3.7.1.min.js', id: 'jquery' },
  { src: '/assets/js/bootstrap.bundle.min.js', id: 'bootstrap' },
  
  // UI Components
  { src: '/assets/js/slick.min.js', id: 'slick' },
  { src: '/assets/js/jquery.waypoints.min.js', id: 'waypoints' },
  { src: '/assets/js/jquery.countup.min.js', id: 'countup' },
  { src: '/assets/js/jquery.nice-select.min.js', id: 'nice-select' },
  { src: '/assets/js/select2.min.js', id: 'select2' },
  { src: '/assets/js/simplyCountdown.js', id: 'countdown' },
  { src: '/assets/js/wow.min.js', id: 'wow' },
  { src: '/assets/js/jquery.marquee.min.js', id: 'marquee' },
  { src: '/assets/js/jquery.pwstabs.min.js', id: 'pwstabs' },
  
  // Custom Scripts
  { src: '/assets/js/scroll_button.js', id: 'scroll-button' },
  { src: '/assets/js/range_slider.js', id: 'range-slider' },
  { src: '/assets/js/sticky_sidebar.js', id: 'sticky-sidebar' },
  { src: '/assets/js/multiple-image-video.js', id: 'media-gallery' },
  { src: '/assets/js/animated_barfiller.js', id: 'barfiller' },
  { src: '/assets/js/custom.js', id: 'custom' },
  { src: '/assets/js/init-slick.js', id: 'init-slick' },
];

// Initialize scripts that need to run after the page loads
export const initializeScripts = () => {
  if (typeof window === 'undefined') return;

  // Initialize WOW.js
  if (window.WOW) {
    new window.WOW().init();
  }

  // Initialize other scripts that need initialization
  // Example:
  // if (window.jQuery && window.jQuery.fn.niceSelect) {
  //   window.jQuery('select').niceSelect();
  // }
};
