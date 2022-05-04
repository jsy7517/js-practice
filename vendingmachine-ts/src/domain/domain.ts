import { EventTypes } from './types';

const Domain = class {
  observers = [];

  dispatch({ eventType, action, data = {} }) {
    const targets = this.observers.filter(
      (observer) => observer.eventType === eventType,
    );
    targets.forEach(({ target }) => target.notify({ action, data }));
  }

  observe({ eventType, target }) {
    this.observers.push({ eventType, target });
    this.subscribe(eventType);
  }

  subscribe(eventType: EventTypes) {}
};

export default Domain;
