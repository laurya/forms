import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { regex, regexErrors, markFormGroupTouched } from '@app/shared/utils';

import { ControlItem } from '@app/models/frontend';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  form!: FormGroup;
  isInline!: boolean;
  regexErrors = regexErrors;

  items: ControlItem[];

  showSpinner: boolean = false;

  constructor(private fb: FormBuilder) { 
    this.isInline = true;

    this.items = [
      { label: 'First', value: 1 },
      { label: 'Second', value: 2 },
      { label: 'Third', value: 3 },
      { label: 'Foruth', value: 4 },
      { label: 'Fifth', value: 5 }
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
        input: [null, {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern(regex.numbers)
            ]
        }],
        password: [null, {
            updateOn: 'blur',
            validators: [
              Validators.required
            ]
        }],
        autocomplete: [null, {
          updateOn: 'change',
          validators: [
            Validators.required
          ]
      }],
        select: [null, {
            updateOn: 'change',
            validators: [
              Validators.required
            ]
        }],
        checkboxes: [null, {
            updateOn: 'change',
            validators: [
              Validators.required
            ]
        }],
        radios: [null, {
            updateOn: 'change',
            validators: [
              Validators.required
            ]
        }],
        date: [null, {
            updateOn: 'change',
            validators: [
              Validators.required
            ]
        }],
        dateRange: [null, {
          updateOn: 'change',
          validators: [
            Validators.required
          ]
      }],
      });
  }

  onPatchValue(): void{
    this.form?.patchValue({ 
      input: 123,
      password: 'hfhgg',
      autocomplete: 1,
      select: 2,
      checkboxes: [3],
      radios: 4,
      date: new Date().getTime(),
      dateRange: {
        from: new Date(2021, 5, 10).getTime(),
        to: new Date(2021, 5, 25).getTime()
      }
    });
  }

  onToogleInline(): void{
    this.isInline = !this.isInline;
  }

  onToogleDisable(): void{
    if (this.form.enabled){
      this.form.disable();
    }
    else {
      this.form.enable();
    }
  }

  onSubmit(): void{
    console.log('Submit');

    if (!this.form.valid) {
        markFormGroupTouched(this.form);
    }
  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
}

}