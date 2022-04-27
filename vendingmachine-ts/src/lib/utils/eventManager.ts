export const { bindCustomEvent, dispatchCustomEvent } = {
  bindCustomEvent(
    $target: HTMLElement,
    eventType: string,
    handler: (e: CustomEvent) => void,
  ) {
    $target.addEventListener(eventType, handler);
  },

  dispatchCustomEvent(
    $target: HTMLElement,
    eventType: string,
    detail: object = {},
  ) {
    const newEvent = new CustomEvent(eventType, { detail });
    $target.dispatchEvent(newEvent);
  },
};
