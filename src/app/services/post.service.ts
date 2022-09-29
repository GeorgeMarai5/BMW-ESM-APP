import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  [x: string]: any;

  static areEqual(formGroup: UntypedFormGroup) {
    let va;
    let valid = true;

    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let con: UntypedFormControl = <UntypedFormControl>formGroup.controls[key];

        if (va === undefined) {
          va = con.value
        } else {
          if (va !== con.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
}
