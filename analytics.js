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

  // Record outbound online-ordering clicks and identify the ordering provider.
  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[href]");
    if (!link) return;
    var url;
    try { url = new URL(link.href, window.location.href); } catch (_) { return; }
    var host = url.hostname.toLowerCase();
    var provider = host.indexOf("doordash") !== -1 ? "doordash"
      : host.indexOf("toasttab") !== -1 || host.indexOf("toast") !== -1 ? "toast"
      : host.indexOf("ubereats") !== -1 || host.indexOf("uber.com") !== -1 ? "ubereats"
      : host.indexOf("grubhub") !== -1 ? "grubhub"
      : link.dataset.orderProvider || "";
    var linkText = (link.textContent || "").trim();
    if (provider) {
      window.gtag("event", "order_link_click", { order_provider: provider, link_url: url.href, link_text: linkText });
      return;
    }
    if (url.protocol === "tel:") window.gtag("event", "phone_click", { link_url: url.href, link_text: linkText });
    else if (url.protocol === "mailto:") window.gtag("event", "email_click", { link_url: url.href, link_text: linkText });
    else if (url.pathname === "/start" || url.pathname === "/start.html") window.gtag("event", "select_plan", { plan: url.searchParams.get("plan") || "unspecified", link_text: linkText });
  });

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || !form.id) return;
    window.gtag("event", "generate_lead", { form_id: form.id, page_path: window.location.pathname });
  });
})();
