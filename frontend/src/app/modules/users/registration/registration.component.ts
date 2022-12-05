import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlsOf } from 'src/app/models/forms/core-form.model';
import { RegistrationForm } from 'src/app/models/forms/registration-form-model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  public form: FormGroup<ControlsOf<RegistrationForm>> = new FormGroup<ControlsOf<RegistrationForm>>({
    userName: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
    passwordConfirmation: new FormControl<string | null>(null, Validators.required),
    legalPerson: new FormControl<boolean | null>(null),
    termsAccepted: new FormControl<boolean | null>(null, Validators.requiredTrue),
  });


}
