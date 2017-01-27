/*!
{
  "name": "HbbTV Video",
  "property": "hbbtvvideo",
  "tags": ["hbbtv", "oipf", "video"],
  "async" : true,
  "notes": [{
      "name": "OIPF Specification Volume 5 Release 1 v1.1 - Declarative Application Environment",
      "href": "http://www.oipf.tv/"
    },
    {
      "name": "MIT-xperts HBBTV testsuite",
      "href": "https://github.com/mitxp/HbbTV-Testsuite"
    }]
}
!*/
/* DOC
Returns if the device supports HbbTV video and if seeking inside a video works.
*/
; (function(window, document, Modernizr) {
  /* global oipfObjectFactory */

  // Deactivate delete rule
  // @see http://jslint.fantasy.codes/variables-should-not-be-deleted/
  /* jshint -W051 */

  // On ANTGalio devices executing oipfCapabilities.hasCapability('+DRM') crashes the browser and only a restart or program change recovers it
  if (navigator.userAgent.match(/ANTGalio/i)) {
    Modernizr.addTest('hbbtvdrm', false);
    return;
  }

  // on older devices it works only when the window is loaded
  window.addEventListener('load', function() {

    var oipfCapabilities;

    try {

      if (
        typeof oipfObjectFactory === 'undefined' ||
        !oipfObjectFactory.isObjectSupported('application/oipfCapabilities')
      ) {
        Modernizr.addTest('hbbtvdrm', false);
        return;
      }

      var systemIdDRMNameMap = {
        'urn:dvb:casystemid:19219': 'playready',
        'urn:dvb:casystemid:19188': 'marlin',
        'urn:dvb:casystemid:19156': 'widevine'
      };

      oipfCapabilities = oipfObjectFactory.createCapabilitiesObject();

      if (oipfCapabilities) {
        // Otherwise some devices show a video signal on the screen
        oipfCapabilities.height = 0;
        oipfCapabilities.width = 0;
      }

      var supportsDRM;
      if (
        !oipfCapabilities ||
        typeof oipfCapabilities.hasCapability !== 'function' ||
        !oipfCapabilities.hasCapability('+DRM')
      ) {
        // Signal browser to do garbage collection on it
        delete oipfCapabilities;
        Modernizr.addTest('hbbtvdrm', false);
        return;
      }

      // xmlCapabilities is not available on all devices
      if (oipfCapabilities.xmlCapabilities) {

        supportsDRM = new Boolean(true);

        var i;
        var drmSystemId;
        var drmName;

        // Search for supported DRM systems
        var drms = oipfCapabilities.xmlCapabilities.getElementsByTagName('drm');
        for (i = 0; i < drms.length; i++) {
          var drm = drms.item(i);
          drmSystemId = drm.getAttribute('DRMSystemID');
          drmName = systemIdDRMNameMap[drmSystemId] || drmSystemId;
          if (drmName) {
            supportsDRM[drmName] = true;
          }
        }

        // Search for profiles supporting DASH and DRM
        var profiles = oipfCapabilities.xmlCapabilities.getElementsByTagName('video_profile');
        for (i = 0; i < profiles.length; i++) {
          var profile = profiles.item(i);
          var transport = profile.getAttribute('transport');
          drmSystemId = profile.getAttribute('DRMSystemID');
          drmName = systemIdDRMNameMap[drmSystemId] || drmSystemId;
          if (transport === 'dash' && drmName) {
            supportsDRM[transport + '_' + drmName] = true;
          }
        }

      } else {
        supportsDRM = true;
      }

      Modernizr.addTest('hbbtvdrm', supportsDRM);

    } catch (e) {
      Modernizr.addTest('hbbtvdrm', false);
    }

    // Signal browser to do garbage collection on it
    delete oipfCapabilities;

  }, false);

})(window, document, window.Modernizr);
