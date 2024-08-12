import { Observable, Subscriber } from "./observable";

/*
 * Creating Operators
 */
export const from = (array: any[]): Observable => {
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

export const of = (...args: any[]): Observable => {
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

export const interval = (timeout: number, maxCounter: number): Observable => {
  return new Observable((subscriber) => {
    try {
      let counter = 0;
      const intervalID = setInterval(() => {
        if (counter >= maxCounter) {
          clearInterval(intervalID);
        }
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
export const filter = (filterFn: (value: any) => boolean) => {
  return (source$: Observable) =>
    new Observable((subscriber) => {
      source$.subscribe({
        next: (value) => {
          if (filterFn(value)) {
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

export const map = (mapFn: (value: any) => any) => {
  return (source$: Observable) =>
    new Observable((subscriber) => {
      source$.subscribe({
        next: (value) => {
          subscriber.next(mapFn(value));
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

export const mergeMap = (toBeMerged$: Observable) => {
  return (source$: Observable) =>
    new Observable((subscriber) => {
      let _value: any = null;
      let _value2: any = null;
      let values = [_value, _value2];

      const callback = () => {
        // detect changes
        if (values[0] !== _value || values[1] !== _value2) {
          values = [_value, _value2];
          subscriber.next(values);
        }
      };

      source$.subscribe({
        next: (value) => {
          _value = value;
          callback();
        },
        error: (error) => {
          subscriber.error(error);
        },
        complete: () => {
          subscriber.complete();
        },
      });

      toBeMerged$.subscribe({
        next: (value2) => {
          _value2 = value2;
          callback();
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
