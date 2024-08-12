export class Observable {
  initFunction: (subscriber: Subscriber) => void;

  constructor(initFunction: (subscriber: Subscriber) => void) {
    this.initFunction = initFunction;
  }

  subscribe(subscriber: Subscriber): Subscription {
    const safeSubscriber = new SafeSubscriber(subscriber);
    this.initFunction(safeSubscriber);
    return new Subscription(this, safeSubscriber);
  }

  pipe(pipeableFunctions: ((source$: Observable) => Observable)[]): Observable {
    let destination$ = pipeableFunctions[0](this);
    for (let i = 1; i < pipeableFunctions.length; i++) {
      destination$ = pipeableFunctions[i](destination$);
    }

    return destination$;
  }
}

export interface Subscriber {
  next: (value: any) => void;
  error: (error: any) => void;
  complete: () => void;
}

class SafeSubscriber implements Subscriber {
  isClosed: boolean;
  subscriber: Subscriber;

  constructor(subscriber: Subscriber) {
    this.isClosed = false;
    this.subscriber = subscriber;
  }

  next(value: any) {
    if (!this.isClosed) {
      this.subscriber.next(value);
    }
  }

  error(error: any) {
    if (!this.isClosed) {
      this.subscriber.error(error);
    }
  }

  complete() {
    this.isClosed = true;
    this.subscriber.complete();
  }
}

class Subscription {
  observable: Observable;
  subscriber: SafeSubscriber;

  constructor(observable: Observable, subscriber: SafeSubscriber) {
    this.observable = observable;
    this.subscriber = subscriber;
  }

  unsubscribe() {
    this.subscriber.complete();
  }
}
