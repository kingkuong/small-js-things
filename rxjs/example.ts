import { Observable, Subscriber } from "./observable";
import { filter, from, interval, map, mergeMap, of } from "./operators";

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

console.log("==========================================");
console.log("Example from([1,2,3])");
const from$ = from([1, 2, 3]);
from$.subscribe(genericSubscriber);

console.log("==========================================");
console.log("Example of(1,2,3,4,5,6,7,8,9,10)");
const of$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe([
  filter((value) => value % 2 === 0),
  map((value) => value * 2),
]);
of$.subscribe(genericSubscriber);

console.log("==========================================");
//console.log("Example interval(500, 5)");
//const interval$ = interval(500, 5);
//const subscription$ = interval$.subscribe(genericSubscriber);
//setTimeout(() => subscription$.unsubscribe(), 2000);

console.log("==========================================");
console.log("Example `mergeMap`");
const interval100$ = interval(100, 10);
const interval200$ = interval(200, 5);
const mergeMapSubscription$ = interval100$
  .pipe([mergeMap(interval200$)])
  .subscribe(genericSubscriber);
setTimeout(() => mergeMapSubscription$.unsubscribe(), 10000);
