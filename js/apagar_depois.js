// (function() {
//   var localSrc = 'http://127.0.0.1:5500/js/test.js';
//   var cdnSrc = 'https://cdn.jsdelivr.net/gh/beatriz-araujo-fwrd/fwd-for-living@latest/js/test.js';
//   var timeout = 200; // in ms
  
//   var loaded = false;
//   var script = document.createElement('script');
  
//   function loadFallback() {
//     if (loaded) return;
//     loaded = true;
//     var fallback = document.createElement('script');
//     fallback.src = cdnSrc;
//     document.body.appendChild(fallback);
//   }
  
//   script.src = localSrc;
//   script.onload = function() { loaded = true; };
//   script.onerror = loadFallback;
  
//   setTimeout(loadFallback, timeout);
  
//   document.body.appendChild(script);
// })();

