/*!
{
  "name": "HbbTV Video",
  "property": "hbbtvvideo",
  "tags": ["hbbtv", "oipf", "video"]
}
!*/
/* DOC
Returns if the device supports HbbTV video and if seeking inside a video works.
*/
;(function(window, document, Modernizr, undefined) {

  if (Modernizr.hbbtv) {
    var passed = new Boolean(true);
    // Sadly a simple test doesn't work with the following devices as they fail
    // while buffering after a seek. For that only a long video would work.
    if (navigator.userAgent.match(/(;Mstar;OWB;Arcelik;J5;|\s150\.14\.20\s.*PhilipsTv)/i)) {
      passed.seek = false;
    } else {
      passed.seek = true;
    }
    Modernizr.addTest('hbbtvvideo', passed);

  } else {
    Modernizr.addTest('hbbtvvideo', false);
  }

})(window, document, window.Modernizr);
