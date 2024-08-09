export class Observable<T> {
  initFunction: (subscriber: Subscriber) => void;

  constructor(initFunction: (subscriber: Subscriber) => void) {
    this.initFunction = initFunction;
  }

  subscribe(subscriber: Subscriber) {
    const safeSubscriber = new SafeSubscriber(subscriber);
    this.initFunction(safeSubscriber);
  }

  unsubscribe() {}

  pipe(
    pipeableFunctions: ((source$: Observable<T>) => Observable<T>)[],
  ): Observable<T> {
    let result = pipeableFunctions[0](this);
    for (let i = 1; i < pipeableFunctions.length; i++) {
      result = pipeableFunctions[i](result);
    }

    return result;
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
    this.subscriber.complete();
    this.isClosed = true;
  }
}
