class Observable<T> {
  subscribeFunction: (subscriber: Subscriber) => void;

  constructor(subscribeFunction: (subscriber: Subscriber) => void) {
    this.subscribeFunction = subscribeFunction;
  }

  subscribe() {
    this.subscribeFunction(subscriber);
  }
  unsubscribe() {}
  pipe() {}
}

interface Subscriber {
  next: (value: any) => void;
  error: (error: any) => void;
  complete: () => void;
}

class Operator {
  constructor() {}
}

const subscriber: Subscriber = {
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

const of = (item: any): Observable<any> => {
  return new Observable((subcriber) => {
    try {
      console.log("Starting subscription");
      subcriber.next(item);
      subscriber.complete();
    } catch (error) {
      subscriber.error(error);
    }
  });
};

const from = (array: any[]): Observable<any[]> => {
  return new Observable((subcriber) => {
    try {
      console.log("Starting subscription");
      array.forEach((item) => {
        subcriber.next(item);
      });
      subscriber.complete();
    } catch (error) {
      subscriber.error(error);
    }
  });
};

console.log("test");
of([1, 2, 3, 4]).subscribe();
from([1, 2, 3, 4]).subscribe();
