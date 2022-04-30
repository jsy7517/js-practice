import { $ } from '../../lib/utils/dom';

const PageElement = class extends HTMLElement {
  $target = $('#app');

  bindEvent() {}

  bindObserver(domain, eventType) {
    domain.observe({ eventType, target: this.$target });
  }

  render() {}

  notify() {}
};

export default PageElement;
