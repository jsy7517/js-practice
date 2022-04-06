const Component = class {
  $target;

  props;

  constructor($target, ...props) {
    this.$target = $target;
    this.props = props;
    this.initStates();
    this.render();
    this.bindEvent();
  }

  render() {
    this.mountTemplate();
    this.mountChildComponents();
  }

  initStates() {}

  bindEvent() {}

  mountTemplate() {}

  mountChildComponents() {}

  bindCustomEvent($target, eventType, handler) {
    $target.addEventListener(eventType, handler);
  }

  dispatchCustomEvent($target, eventType, data = {}) {
    const newEvent = new CustomEvent(eventType, { detail: data });
    $target.dispatchEvent(newEvent);
  }
};

export default Component;
