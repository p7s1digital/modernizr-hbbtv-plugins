/*!
{
  "name": "HbbTV oipfOjectFactory",
  "property": "hbbtvoipfobjectfactory",
  "caniuse": "hbbtv",
  "tags": ["hbbtv", "oipf"]
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
