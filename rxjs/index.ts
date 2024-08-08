class Observable<T> {
  constructor(subscribe: void) {}

  subscribe() {}
  unsubscribe() {}
  pipe() {}
}

interface Subscriber {
  next: (value: any) => void;
  error: (error: any) => void;
  complete: (lastValue: any) => void;
}

class Opeartor {
  constructor() {}
}

const subscriber: Subscriber = {
  next: (value) => {
    console.log(value);
  },
  error: (error) => {
    console.error(error);
  },
  complete: (lastValue) => {
    console.log(lastValue);
  },
};

const of = (item: any): Observable<any> => {
  const t = new Observable((subcriber) => {
    console.log("starting subscriber");
    subcriber.next(item);
    subscriber.complete();
  });

  return t;
};

const from = (array: any[]): Observable<any[]> => {
  const t = new Observable(subscriber);
  return t;
};

const mergeMap = (observables: Observable<any>[]): Observable<any[]> => {
  const t = new Observable(subscriber);
  return t;
};
