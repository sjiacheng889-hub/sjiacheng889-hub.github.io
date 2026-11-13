/* WebMCP imperative tools (read-only). Feature-detected: silently no-ops on
   browsers without document.modelContext. Registered on the SPA so AI agents
   can query company details and the generator catalogue directly. */
(function () {
  "use strict";
  var mc =
    (typeof document !== "undefined" && document.modelContext) ||
    (typeof navigator !== "undefined" && navigator.modelContext);
  if (!mc || typeof mc.registerTool !== "function") return;

  var COMPANY = {
    legalName: "Luchuan County Zhiqiang Motor Factory",
    chineseName: "陆川县志强电机厂",
    brand: "Zhiqiang Power",
    founded: 2003,
    address: "West side of Longhao Entrepreneurship Park, Luchuan County, Yulin, Guangxi, China 537700",
    phoneWhatsApp: "+86 150 5749 1423",
    telFax: "+86 775 7231555",
    salesEmail: "tommy@zhiqiang-power.com",
    afterSalesEmail: "as@zhiqiang-power.com",
    website: "https://zhiqiang-power.com",
    certification: "ISO 9001 (quality management)",
    products: "Diesel generator sets 30-2200 kW, 50/60 Hz (open skid, silent canopy, containerised, trailer)",
    exportMarkets: ["Vietnam", "Philippines", "Thailand", "Malaysia", "Myanmar", "Indonesia", "Singapore"]
  };

  function reg(tool) {
    try {
      var p = mc.registerTool(tool);
      if (p && typeof p.catch === "function") p.catch(function () {});
    } catch (e) { /* ignore */ }
  }

  reg({
    name: "getCompanyInfo",
    description: "Returns Zhiqiang Power company details: legal name, factory address, phone, WhatsApp, tel/fax, email, certification and export markets.",
    inputSchema: { type: "object", properties: {}, required: [] },
    annotations: { readOnlyHint: true },
    execute: async function () { return JSON.stringify(COMPANY, null, 2); }
  });

  reg({
    name: "getGeneratorCatalogue",
    description: "Returns a summary of the diesel generator set catalogue: power range, model count, frequencies, enclosure types, and where to find full specs or request a quote.",
    inputSchema: {
      type: "object",
      properties: {
        maxKw: { type: "number", description: "Optional upper power limit in kW to note in the summary." }
      },
      required: []
    },
    annotations: { readOnlyHint: true },
    execute: async function (args) {
      var summary = {
        powerRangeKw: "30-2200",
        models: 27,
        frequencies: ["50 Hz", "60 Hz"],
        enclosures: ["open skid", "silent canopy", "containerised", "trailer-mounted"],
        engine: "Yuchai diesel (genuine)",
        alternator: "TFW brushless (wound in-house)",
        testing: "Load-bank tested 0-110% before shipment",
        catalogueUrl: "https://zhiqiang-power.com/products/",
        requestQuoteUrl: "https://zhiqiang-power.com/request-a-quote/"
      };
      if (args && typeof args.maxKw === "number") summary.filterMaxKw = args.maxKw;
      return JSON.stringify(summary, null, 2);
    }
  });
})();
