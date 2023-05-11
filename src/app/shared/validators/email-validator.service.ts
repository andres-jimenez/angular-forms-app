import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email: string = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        console.log({ email });

        if (email === 'andres@gmail.com') {
          subscriber.next({ emailTaken: true });
        } else {
          subscriber.next(null);
        }

        subscriber.complete();
      }
    ).pipe(delay(1500));

    return httpCallObservable;
  }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email: string = control.value;

  //   console.log({ email });

  //   return of({
  //     emailTaken: true,
  //   }).pipe(delay(2000));
  // }
}
