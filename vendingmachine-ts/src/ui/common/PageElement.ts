import { EventTypes } from '../../domain/types';
import { $ } from '../../lib/utils/dom';

const PageElement = class extends HTMLElement {
  $target = $('#app');

  bindEvent() {}

  bindObserver(domain, eventType: EventTypes, target = this.$target) {
    domain.observe({ eventType, target });
  }

  render() {}

  notify(data) {}
};

export default PageElement;
