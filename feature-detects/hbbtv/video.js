/*jshint -W053 */
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
    // A simple test doesn't work as the problematic devices fail while seeking in a video
    // that is not yet completely buffered. They passed with a short video.
    // For playing videos we didn't discover any problems besides that some devices are really
    // slow.
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
