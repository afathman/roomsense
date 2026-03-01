export function fireSaveStatus(element: HTMLElement, status: "saving" | "saved" | "error") {
  element.dispatchEvent(new CustomEvent("save-status", {
    detail: { status },
    bubbles: true,
    composed: true,
  }));
}

export function openEntityInfo(element: HTMLElement, entityId: string) {
  element.dispatchEvent(new CustomEvent("hass-more-info", {
    bubbles: true,
    composed: true,
    detail: { entityId },
  }));
}
