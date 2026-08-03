/* ==========================================================================
   Google Analytics 4 — First Wake Media

   >>> PUT YOUR MEASUREMENT ID ON THE LINE BELOW. That's the only edit. <<<

   Where to find it:
     1. Go to analytics.google.com and sign in.
     2. Admin (gear, bottom left) -> Create -> Property. Name it "First Wake Media".
     3. Pick "Web" as the platform and enter your domain.
     4. Google shows you a Measurement ID that looks like G-ABC1234XYZ.
     5. Paste it between the quotes below, replacing G-XXXXXXXXXX.

   Until you do that, this file does nothing at all — no tracking scripts load
   and no requests are sent. That's deliberate, so the site isn't firing broken
   analytics calls before you're set up.
   ========================================================================== */

var GA_MEASUREMENT_ID = "G-7TM30MHM45";


/* ---------- nothing below this line needs editing ---------- */
(function () {
  // Bail out while the ID is still the placeholder.
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf("XXXX") !== -1) {
    window.gtag = window.gtag || function () {};   // keep other scripts safe
    if (window.console && console.info) {
      console.info("[First Wake Media] Google Analytics is not configured yet. " +
                   "Add your Measurement ID at the top of analytics.js.");
    }
    return;
  }

  // Load the official gtag.js library.
  var tag = document.createElement("script");
  tag.async = true;
  tag.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(tag);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true          // trims visitor IPs; friendlier for privacy policies
  });
})();
