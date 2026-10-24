/* Zumo Quoin Limited — site behaviour. No dependencies; every feature is
   optional and the pages work without JavaScript. */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---- Mobile navigation ------------------------------------------------ */
  var toggle = $("[data-nav-toggle]");
  var nav = $("[data-nav]");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ---- Header shadow once the page scrolls ------------------------------- */
  var header = $("[data-header]");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Reveal on scroll -------------------------------------------------- */
  var revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Footer year ------------------------------------------------------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  var fmt = function (n) { return Math.round(n).toLocaleString("en"); };

  /* ---- Feed planner (home) ----------------------------------------------
     Typical average intake in grams per bird per day. These are broad
     industry figures for planning only; adjust to the company's own data. */
  var est = $("[data-estimator]");
  if (est) {
    var PROFILES = {
      layers: { grams: 115, feed: "Layer Mash", product: "layer-mash" },
      broilers: { grams: 100, feed: "Broiler Starter & Finisher", product: "broiler-finisher" },
      growers: { grams: 70, feed: "Grower Mash", product: "grower-mash" },
      chicks: { grams: 30, feed: "Chick Starter", product: "chick-starter" }
    };
    var BAG_KG = 50;
    var birds = $("[data-birds]", est);
    var birdsRange = $("[data-birds-range]", est);
    var days = $("[data-days]", est);
    var link = $("[data-out-link]", est);

    var update = function () {
      var type = ($("input[name=bird]:checked", est) || {}).value || "layers";
      var p = PROFILES[type];
      var count = Math.max(0, parseInt(birds.value, 10) || 0);
      var period = parseInt(days.value, 10) || 30;
      var daily = (count * p.grams) / 1000;
      var total = daily * period;
      $("[data-out-daily]", est).textContent = fmt(daily);
      $("[data-out-total]", est).textContent = fmt(total);
      $("[data-out-bags]", est).textContent = fmt(Math.ceil(total / BAG_KG));
      $("[data-out-feed]", est).textContent = p.feed;
      var periodText = days.options[days.selectedIndex].text;
      link.href = "contact.html?enquiry=quote&product=" + p.product +
        "&qty=" + encodeURIComponent(fmt(total) + " kg over " + periodText) +
        "&birds=" + count;
    };

    birdsRange.addEventListener("input", function () { birds.value = birdsRange.value; update(); });
    birds.addEventListener("input", function () {
      var v = parseInt(birds.value, 10) || 0;
      birdsRange.value = Math.min(Math.max(v, +birdsRange.min), +birdsRange.max);
      update();
    });
    days.addEventListener("change", update);
    $$("input[name=bird]", est).forEach(function (r) { r.addEventListener("change", update); });
    update();
  }

  /* ---- Product filter (products page) ------------------------------------ */
  var filterBar = $("[data-filters]");
  if (filterBar) {
    var buttons = $$("[data-filter]", filterBar);
    var products = $$("[data-category]");
    var countEl = $("[data-filter-count]");
    var empty = $("[data-empty]");

    var apply = function (cat, push) {
      if (!buttons.some(function (b) { return b.dataset.filter === cat; })) cat = "all";
      var shown = 0;
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.filter === cat)); });
      products.forEach(function (p) {
        var match = cat === "all" || p.dataset.category.split(" ").indexOf(cat) !== -1;
        p.hidden = !match;
        if (match) shown++;
      });
      if (countEl) countEl.textContent = shown + (shown === 1 ? " feed" : " feeds");
      if (empty) empty.hidden = shown !== 0;
      if (push) history.replaceState(null, "", cat === "all" ? location.pathname : "#" + cat);
    };

    buttons.forEach(function (b) {
      b.addEventListener("click", function () { apply(b.dataset.filter, true); });
    });
    var fromHash = function () { apply(location.hash.replace("#", "") || "all", false); };
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  /* ---- Contact form ------------------------------------------------------ */
  var form = $("[data-enquiry-form]");
  if (form) {
    var params = new URLSearchParams(location.search);
    var enquiry = params.get("enquiry");
    if (enquiry) {
      var radio = $('input[name="enquiry_type"][value="' + enquiry.replace(/[^a-z-]/g, "") + '"]', form);
      if (radio) radio.checked = true;
    }
    var product = params.get("product");
    if (product) {
      var sel = $("#product", form);
      if (sel && $('option[value="' + product.replace(/[^a-z-]/g, "") + '"]', sel)) sel.value = product;
    }
    var qty = params.get("qty");
    if (qty) $("#quantity", form).value = qty.slice(0, 120);
    var birdCount = params.get("birds");
    if (birdCount && /^\d+$/.test(birdCount)) $("#flock", form).value = birdCount;

    var status = $("[data-form-status]");
    var statusText = $("[data-form-status-text]");
    var submit = $("button[type=submit]", form);

    var fieldOf = function (input) { return input.closest(".field"); };
    var validate = function (input) {
      var field = fieldOf(input);
      if (!field) return true;
      var ok = input.checkValidity();
      field.classList.toggle("is-invalid", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      return ok;
    };

    $$("input, select, textarea", form).forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value) validate(input);
      });
      input.addEventListener("input", function () {
        if (fieldOf(input) && fieldOf(input).classList.contains("is-invalid")) validate(input);
      });
    });

    var showStatus = function (kind, html) {
      status.className = "form-status form-status--" + kind + " is-visible";
      $("[data-status-icon=success]", status).hidden = kind !== "success";
      $("[data-status-icon=error]", status).hidden = kind === "success";
      statusText.innerHTML = html;
      status.focus();
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = $$("[required]", form);
      var firstBad = null;
      fields.forEach(function (input) {
        if (!validate(input) && !firstBad) firstBad = input;
      });
      if (firstBad) {
        firstBad.focus();
        return;
      }
      if ($("[name=_gotcha]", form).value) return; // spam bot filled the honeypot

      var endpoint = form.getAttribute("action") || "";
      // Until a real form endpoint is configured (see README), fall back to
      // an email draft rather than pretending the enquiry was sent.
      if (endpoint.indexOf("YOUR_FORM_ID") !== -1) {
        var data = new FormData(form);
        var body = [];
        data.forEach(function (v, k) { if (k.charAt(0) !== "_" && v) body.push(k.replace(/_/g, " ") + ": " + v); });
        var to = form.dataset.fallbackEmail || "";
        var mailto = "mailto:" + to + "?subject=" + encodeURIComponent("Website enquiry from " + data.get("name")) +
          "&body=" + encodeURIComponent(body.join("\n"));
        showStatus("error",
          "<strong>Online enquiries are not switched on yet.</strong> " +
          'Please <a href="' + mailto.replace(/"/g, "&quot;") + '">send your enquiry by email</a> ' +
          "or call us using the details on this page.");
        return;
      }

      submit.setAttribute("aria-busy", "true");
      fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          form.reset();
          showStatus("success", "<strong>Thank you, your enquiry has been sent.</strong> Our team will get back to you shortly.");
        })
        .catch(function () {
          showStatus("error", "<strong>Sorry, something went wrong.</strong> Please try again, or call or email us directly.");
        })
        .then(function () { submit.removeAttribute("aria-busy"); });
    });
  }
})();
