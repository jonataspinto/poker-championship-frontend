interface IEventManager {
  on: (event: string, listener: EventManagerListenerCallback) => void;
  emit: (event: string, payload: EventManagerListenerCallbackPayload) => void;
  removeListener: (
    event: string,
    listener: EventManagerListenerCallback
  ) => void;
}

type EventManagerListenerCallbackPayload = Partial<CustomEvent>;

type EventManagerListenerCallback = (
  payload: EventManagerListenerCallbackPayload
) => void;

export class EventManager implements IEventManager {
  listeners: Map<string, Array<EventManagerListenerCallback>>;
  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: EventManagerListenerCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  emit(event: string, payload: EventManagerListenerCallbackPayload) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event)?.forEach(listener => {
      listener(payload);
    });
  }

  removeListener(
    event: string,
    listenerToRemove: EventManagerListenerCallback
  ) {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter(
      listener => listener !== listenerToRemove
    );

    this.listeners.set(event, filteredListeners);
  }
}
