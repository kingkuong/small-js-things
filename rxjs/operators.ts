import { Observable, Subscriber } from "./observable";

/*
 * Creating Operators
 */
export const of = (...args: any[]): Observable<any> => {
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

export const from = (array: any[]): Observable<any> => {
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

export const interval = (
  timeout: number,
  maxCounter: number,
): Observable<any> => {
  return new Observable((subscriber) => {
    try {
      let counter = 0;
      const intervalID = setInterval(() => {
        subscriber.next(counter++);
      }, timeout);
    } catch (error) {
      subscriber.error(error);
    }
  });
};

/*
 * Transforming Operators
 */
export const filter = () => {
  return (source$: Observable<any>) =>
    new Observable((subscriber) => {
      source$.subscribe({
        next: (value) => {
          if (value % 2 === 0) {
            subscriber.next(value);
          }
        },
        error: (error) => {
          subscriber.error(error);
        },
        complete: () => {
          subscriber.complete();
        },
      });
    });
};

export const map = () => {
  return (source$: Observable<any>) =>
    new Observable((subscriber) => {
      const subscription = source$.subscribe({
        next: (value) => {
          subscriber.next(value * 2);
        },
        error: (error) => {
          subscriber.error(error);
        },
        complete: () => {
          subscriber.complete();
        },
      });
    });
};
