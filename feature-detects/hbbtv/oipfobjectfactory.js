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
  /* global oipfObjectFactory */

  Modernizr.addTest('hbbtvoipfobjectfactory',
    typeof oipfObjectFactory !== 'undefined' &&
    typeof oipfObjectFactory.isObjectSupported === 'function'
  );
})(window.Modernizr);
