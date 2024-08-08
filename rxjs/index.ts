class Observable<T> {
  initFunction: (subscriber: Subscriber) => void;

  constructor(initFunction: (subscriber: Subscriber) => void) {
    this.initFunction = initFunction;
  }

  subscribe(subscriber: Subscriber) {
    const safeSubscriber = new SafeSubscriber(subscriber);
    this.initFunction(safeSubscriber);
  }

  unsubscribe() {}
  pipe() {}
}

interface Subscriber {
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

class Operator {
  constructor() {}
}

const of = (...args: any[]): Observable<any> => {
  return new Observable((subscriber) => {
    try {
      console.log("Starting subscription");
      for (let i = 0; i < args.length; i++) {
        subscriber.next(args[i]);
      }
      subscriber.complete();
    } catch (error) {
      subscriber.error(error);
    }
  });
};

const from = (array: any[]): Observable<any[]> => {
  return new Observable((subscriber) => {
    try {
      console.log("Starting subscription");
      array.forEach((item) => {
        subscriber.next(item);
      });
      subscriber.complete();
    } catch (error) {
      subscriber.error(error);
    }
  });
};

const fromEvent = (array: any[]): Observable<any[]> => {
  return new Observable((subscriber) => {
    try {
      console.log("Starting subscription");
      array.forEach((item) => {
        subscriber.next(item);
      });
      subscriber.complete();
    } catch (error) {
      subscriber.error(error);
    }
  });
};

const mergeMap = (observables: Observable<any>[]): Observable<any> => {
  return new Observable((subscriber) => {});
};

const genericSubscriber: Subscriber = {
  next: (value: any) => {
    console.log(value);
  },
  error: (error: Error) => {
    console.error(error);
  },
  complete: () => {
    console.log("Subscription ended");
  },
};

console.log("Testing started");
of(1, 2, 3).subscribe(genericSubscriber);
from([1, 2, 3]).subscribe(genericSubscriber);
