/*!
{
  "name": "HbbTV",
  "property": "hbbtv",
  "caniuse": "hbbtv",
  "tags": ["hbbtv", "oipf", "video"]
}
!*/
/* DOC
TODO: add a real test
*/
;(function(Modernizr) {
  Modernizr.addTest('hbbtv', !!navigator.userAgent.match(/(HbbTV|Opera TV)/i));
})(window.Modernizr);
