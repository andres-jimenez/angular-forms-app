import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider')
      return {
        noStrider: true,
      };

    return null;
  };

  isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value || '';
      const fieldValue2 = formGroup.get(field2)?.value || '';

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });

        return {
          notEqual: true,
        };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }

  // camposIguales(campo1: string, campo2: string) {
  //   return (formGroup: AbstractControl): ValidationErrors | null => {
  //     const pass1 = formGroup.get(campo1)?.value;
  //     const pass2 = formGroup.get(campo2)?.value;

  //     if (pass1 !== pass2) {
  //       formGroup.get(campo2)?.setErrors({ noIguales: true });
  //       return { noIguales: true };
  //     }

  //     if (formGroup.get(campo2)?.hasError('noIguales')) {
  //       delete formGroup.get(campo2)?.errors?.['noIguales'];
  //       formGroup.get(campo2)?.updateValueAndValidity();
  //     }

  //     //Este return únicamente se realiza si los dos campos son iguales
  //     return null;
  //   };
  // }
}
