import { EventManager } from './EventManager';

const notificationEventManager = new EventManager();

const listener1 = jest.fn();
const listener2 = jest.fn();

describe('EventManager', () => {
  notificationEventManager.on('test', listener1);
  notificationEventManager.on('test', listener2);

  it('should run the listeners correctly', () => {
    notificationEventManager.emit('test', { detail: {} });
    expect(listener1).toHaveBeenCalled();
    expect(listener1).toHaveBeenCalled();
  });

  it('Do not should run after remover function from listeners', () => {
    notificationEventManager.removeListener('test', listener1);

    notificationEventManager.emit('test', {});

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(2);
  });
});
