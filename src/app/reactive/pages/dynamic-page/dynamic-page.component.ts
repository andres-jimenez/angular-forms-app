import { Component } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  // public myForm = new FormGroup({
  //   favoritesGames=new FormArray([])
  // })

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  constructor(private formBuilder: FormBuilder) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field].errors) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Field must have at least ${errors['minlength'].requiredLength} characters`;
      }
    }

    return null;
  }

  onAddFavorite(): void {
    if (this.newFavorite.invalid) return;

    // this.favoriteGames.push(new FormControl(this.newFavorite.value, [Validators.required, Validators.minLength(3)]))

    this.favoriteGames.push(
      this.formBuilder.control(this.newFavorite.value, [
        Validators.required,
        Validators.minLength(3),
      ])
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset();
    (this.myForm.controls['favoriteGames'] as FormArray) =
      this.formBuilder.array([]);
  }
}
