import { Gift } from './../../../../shared/models/Gift';

import { FormArray, Validators, FormBuilder } from '@angular/forms';


export class Helpers {

  constructor(private fb: FormBuilder) {

  }

 static getFormArrayValues(formArray: FormArray) {
    const valueArray: any[] = [];
    formArray.controls.forEach(element => {
      if (element.valid) {
        valueArray.push(element.value);
      }
    });
    return valueArray;
  }



 getBenefits(gifts: Gift[]): FormArray {

  const arr = this.fb.array([]);
  if (gifts.length > 0) {
    gifts.forEach(gift => {
      arr.push(this.fb.group({
        type: [gift.type, Validators.required],
        description: [gift.description, Validators.required],
        relationship: [gift.relationship],
      }));

    });
  } else {
    arr.push(this.fb.group({
      type: [null, Validators.required],
      description: ['', Validators.required],
      relationship: [null],
    }));
  }

  return arr;
}

}

