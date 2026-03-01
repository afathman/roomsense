/**
 * Force-load Home Assistant's built-in web components so custom panels
 * can use <ha-card>, <ha-button>, <ha-select>, <ha-entity-picker>, etc.
 *
 * Technique used by alarmo, scheduler-card, mushroom, and others.
 */
export const loadHaElements = async (): Promise<void> => {
  if (customElements.get("ha-entity-picker")) return;

  // Step 1: Load base HA components via partial-panel-resolver
  if (!customElements.get("ha-card")) {
    await customElements.whenDefined("partial-panel-resolver");
    const ppr = document.createElement("partial-panel-resolver") as any;
    ppr.hass = {
      panels: [{ url_path: "tmp", component_name: "config" }],
    };
    ppr._updateRoutes();
    await ppr.routerOptions.routes.tmp.load();

    await customElements.whenDefined("ha-panel-config");
    const cpr = document.createElement("ha-panel-config") as any;
    await cpr.routerOptions.routes.automation.load();
  }

  // Step 2: Force-load ha-entity-picker via loadCardHelpers.
  // The automation route alone doesn't reliably register it in HA 2025+.
  if (!customElements.get("ha-entity-picker")) {
    try {
      const helpers = await (window as any).loadCardHelpers();
      const card = await helpers.createCardElement({
        type: "entities",
        entities: [],
      });
      await card.constructor.getConfigElement();
    } catch {
      // Fallback: entity picker may already be available
    }
  }

  await customElements.whenDefined("ha-card");

  // Step 3: Load ha-date-range-picker (used by rs-analytics).
  if (!customElements.get("ha-date-range-picker")) {
    try {
      const helpers = await (window as any).loadCardHelpers();
      await helpers.createCardElement({
        type: "energy-date-selection",
        entities: [],
      });
      await Promise.race([
        customElements.whenDefined("ha-date-range-picker"),
        new Promise((_, reject) => setTimeout(reject, 5000)),
      ]);
    } catch {
      // ha-date-range-picker not available — fallback handled in component
    }
  }

  // Step 4: Load ha-chart-base (used by rs-analytics).
  // It is part of HA's history/energy modules and NOT loaded by the
  // config panel or card-helpers entities card.  Trigger the import
  // chain via the statistics-graph lovelace card, which depends on it.
  if (!customElements.get("ha-chart-base")) {
    try {
      const helpers = await (window as any).loadCardHelpers();
      await helpers.createCardElement({
        type: "statistics-graph",
        entities: [],
      });
      // Wait up to 5 s for async registration
      await Promise.race([
        customElements.whenDefined("ha-chart-base"),
        new Promise((_, reject) => setTimeout(reject, 5000)),
      ]);
    } catch {
      // ha-chart-base not available – analytics chart will be empty
    }
  }
};
