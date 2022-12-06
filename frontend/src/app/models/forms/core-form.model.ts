import { FormArray, FormControl, FormGroup } from '@angular/forms';

/**
 * Awesome form type checker
 * https://netbasal.com/typed-reactive-forms-in-angular-no-longer-a-type-dream-bf6982b0af28
 * https://betterprogramming.pub/how-to-build-a-strongly-typed-angular-14-super-form-86837965a0e5
 */
export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
    ? FormGroup<ControlsOf<T[K]>> | FormArray<any>
    : FormControl<T[K]>;
};
