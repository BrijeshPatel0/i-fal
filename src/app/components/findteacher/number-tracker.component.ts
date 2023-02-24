import { Component, Input, OnDestroy } from "@angular/core";
import { Subject, timer } from "rxjs";
import {
  switchMap,
  startWith,
  scan,
  takeWhile,
  takeUntil,
  mapTo,
} from "rxjs/operators";

@Component({
  selector: "number-tracker",
  template: `
    <span
      style="    font-size: 30px;
    color: #28aae1;
    font-weight: 500;"
    >
      {{ currentNumber }}</span
    >
  `,
})
export class NumberTrackerComponent implements OnDestroy {
  @Input()
  set end(endRange: number) {
    this._counterSub$.next(endRange);
  }
  @Input() countInterval = 0;
  public currentNumber = 100;
  private _counterSub$ = new Subject();
  private _onDestroy$ = new Subject();

  constructor() {
    this._counterSub$
      .pipe(
        switchMap((endRange) => {
          return timer(0, this.countInterval).pipe(
            mapTo(this.positiveOrNegative(endRange, this.currentNumber)),
            startWith(this.currentNumber),
            scan((acc: number, curr: number) => acc + curr),
            takeWhile(this.isApproachingRange(endRange, this.currentNumber))
          );
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe((val: number) => (this.currentNumber = val));
  }

  private positiveOrNegative(endRange: any, currentNumber: any) {
    return endRange > currentNumber ? 1 : -1;
  }

  private isApproachingRange(endRange: any, currentNumber: any) {
    return endRange > currentNumber
      ? (val: number) => val <= endRange
      : (val: number) => val >= endRange;
  }

  ngOnDestroy() {
    this._onDestroy$.next("");
    this._onDestroy$.complete();
  }
}
