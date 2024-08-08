import { Observable, Subscriber } from "./observable";

/*
 * Create Operators
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

export const from = (array: any[]): Observable<any[]> => {
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
): Observable<any[]> => {
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
 * Transform Operators
 */
const filter = [];
const map = [];
const mergeMap = (observables: Observable<any>[]): Observable<any> => {
  return new Observable((subscriber) => {});
};
