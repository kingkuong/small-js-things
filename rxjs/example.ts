import { Observable, Subscriber } from "./observable";
import { of, from, interval, map, filter } from "./operators";

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

console.log("Example of(1,2,3)");
of(1, 2, 3).pipe([filter(), map()]).subscribe(genericSubscriber);

//console.log("Example from([1,2,3])");
//from([1, 2, 3]).subscribe(genericSubscriber);
//
//console.log("Example interval(1000)");
//interval(500, 5).subscribe(genericSubscriber);
