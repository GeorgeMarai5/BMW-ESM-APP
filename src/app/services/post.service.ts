import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  static areEqual(formGroup: FormGroup) {
    let va;
    let valid = true;

    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let con: FormControl = <FormControl>formGroup.controls[key];

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
