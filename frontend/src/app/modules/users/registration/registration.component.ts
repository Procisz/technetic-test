import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {
  debounceTime,
  Subject,
  takeUntil,
  filter,
  distinctUntilChanged,
  tap,
  Observable,
} from 'rxjs';
import { Classes } from 'src/app/enums/classes.enum';
import { DefaultValues } from 'src/app/enums/values.enum.ts';
import { Hearing } from 'src/app/models/data/hearing.model';
import { Invitation } from 'src/app/models/data/invitiation.model';
import { User } from 'src/app/models/data/user.model';
import { ControlsOf } from 'src/app/models/forms/core-form.model';
import { RegistrationForm } from 'src/app/models/forms/registration-form-model';
import { EmailService } from 'src/app/services/email.service';
import { HearingService } from 'src/app/services/hearing.service';
import { InvitationService } from 'src/app/services/invitation.service';
import { UserService } from 'src/app/services/user.service';
import { fadeInOutAnimation } from 'src/app/utils/custom-fade-animations';
import { emailPattern, passwordPattern } from 'src/app/utils/patterns';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [fadeInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit, OnDestroy {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private emailService: EmailService,
    private userService: UserService,
    private hearingService: HearingService,
    private invitationService: InvitationService
  ) {}

  private unsub: Subject<boolean> = new Subject();
  public arePasswordsVisible: boolean = false;
  public isEmailCheckInProgress: boolean = false;
  public isFormDisabled: boolean = false;
  public containerClasses: string = Classes.CONTAINER_CLASSES;

  private today: Date = new Date();
  public minDate: Date = new Date(
    this.today.getFullYear() - 18,
    this.today.getMonth(),
    this.today.getDate()
  );

  public hearingOptions$: Observable<Hearing[]> =
    this.hearingService.getHearings();

  public form: FormGroup<ControlsOf<RegistrationForm>> = new FormGroup<
    ControlsOf<RegistrationForm>
  >({
    userName: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(emailPattern),
    ]),
    dateOfBirth: new FormControl<Date | null>(null, Validators.required),
    hearing: new FormControl<Hearing[]>([], Validators.required),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(passwordPattern),
    ]),
    passwordConfirmation: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(passwordPattern),
    ]),
    legalPerson: new FormControl<boolean>(false),
    termsAccepted: new FormControl<boolean>(false, Validators.requiredTrue),
    invitations: new FormArray<any>([]),
  });

  public ngOnInit(): void {
    this.addFormGroup();
    this.setupSubscriptions();
  }

  private setupSubscriptions(): void {
    // Checking passwords
    this.form.controls.password.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(DefaultValues.DEBOUNCE_TIME),
        filter((value: string | null) => !!value),
        takeUntil(this.unsub)
      )
      .subscribe((response: any) => {
        if (response) this.validatePasswordFields();
      });

    this.form.controls.passwordConfirmation.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(DefaultValues.DEBOUNCE_TIME),
        filter((value: string | null) => !!value),
        takeUntil(this.unsub)
      )
      .subscribe((response: any) => {
        if (response) this.validatePasswordFields();
      });

    // Checking email
    this.form.controls.email.valueChanges
      .pipe(
        tap(() => (this.isEmailCheckInProgress = true)),
        debounceTime(DefaultValues.DEBOUNCE_TIME),
        distinctUntilChanged(),
        filter((value: string | null) => !!value),
        takeUntil(this.unsub)
      )
      .subscribe({
        next: (value: string | null) => this.checkEmail(value),
      });
  }

  /** ***** FORM ARRAY CONTROLLING START ***** */
  public get invitationsFormArray(): FormArray {
    const formGroup = this.form.get('invitations') as FormArray;
    return formGroup;
  }

  public addFormGroup(): void {
    const formGroup = this.form.get('invitations') as FormArray;
    formGroup.push(new FormGroup({ email: new FormControl('') }));

    this.changeDetectorRef.markForCheck();
  }

  public removeFormGroup(index: number): void {
    const formGroup = this.form.get('invitations') as FormArray;
    formGroup.removeAt(index);
    this.changeDetectorRef.markForCheck();
  }
  /** ***** FORM ARRAY CONTROLLING END ***** */

  private checkEmail(value: string | null): void {
    if (this.form.controls.email.invalid) return;

    this.changeDetectorRef.detectChanges();

    this.emailService
      .checkEmailAvailability(value)
      .pipe(takeUntil(this.unsub))
      .subscribe({
        next: (response: boolean) => {
          if (response) this.form.controls.email.setErrors(null);
          else this.form.controls.email.setErrors({ emailNotAvailable: true });

          this.form.controls.email.markAsTouched();
          this.isEmailCheckInProgress = false;
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  private validatePasswordFields(): void {
    if (
      !this.form.controls.password.value ||
      !this.form.controls.passwordConfirmation.value
    )
      return;

    if (
      this.form.controls.password.value ===
      this.form.controls.passwordConfirmation.value
    ) {
      this.form.controls.password.setErrors(null);
      this.form.controls.passwordConfirmation.setErrors(null);
    } else {
      this.form.controls.password.setErrors({ passwordsNotMatching: true });
      this.form.controls.passwordConfirmation.setErrors({
        passwordsNotMatching: true,
      });
    }
    this.changeDetectorRef.detectChanges();
  }

  public togglePasswordVisibility(): void {
    this.arePasswordsVisible = !this.arePasswordsVisible;
    this.changeDetectorRef.detectChanges();
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    this.isFormDisabled = true;
    this.changeDetectorRef.detectChanges();
    this.createUser();
  }

  public createUser(): void {
    const formData: FormData = this.processingFormForUserCreation();

    this.userService
      .addNewUser(formData)
      .pipe(takeUntil(this.unsub))
      .subscribe({
        next: (createdUser: User) => {
          this.isFormDisabled = false;
          this.form.reset();
          this.form.markAsPristine();
          this.form.markAsUntouched();
          this.form.updateValueAndValidity();
          this.changeDetectorRef.detectChanges();

          console.log(
            'length',
            (this.form.controls.invitations as FormArray).length
          );
          if ((this.form.controls.invitations as FormArray).length)
            this.createInvitations(createdUser.user_id);
        },
        error: () => {
          this.isFormDisabled = false;
          this.changeDetectorRef.detectChanges();
          // TODO: Error handling
        },
      });
  }

  private processingFormForUserCreation(): FormData {
    const formData: FormData = new FormData();

    formData.append('userName', this.form.controls.userName.value || '');
    formData.append('email', this.form.controls.email.value || '');
    formData.append(
      'dateOfBirth',
      JSON.stringify(this.form.controls.dateOfBirth.value)
    );
    formData.append(
      'hearingId',
      JSON.stringify(this.form.controls.hearing.value) || ''
    );
    formData.append('password', this.form.controls.password.value || '');
    formData.append(
      'legalPerson',
      JSON.stringify(this.form.controls.legalPerson.value)
    );
    formData.append(
      'termsAccepted',
      JSON.stringify(this.form.controls.termsAccepted.value)
    );

    return formData;
  }

  public createInvitations(userID: number): void {
    const formData: FormData = this.processingFormForInvitations(userID);

    this.invitationService
      .addInvitations(formData)
      .pipe(takeUntil(this.unsub))
      .subscribe({
        next: () => {
          // TODO: Success response handling
        },
        error: () => {
          // TODO: Error handling
        },
      });
  }

  private processingFormForInvitations(userID: number): FormData {
    const formData: FormData = new FormData();
    const invitations: Invitation[] = [];

    this.form.controls.invitations.value.forEach((invitation: Invitation) => {
      if (invitation.email) {
        const newInvitation: Invitation = {
          email: invitation.email,
          invited_by: userID,
        };
        invitations.push(newInvitation);
      }
    });

    formData.append('invitations', JSON.stringify(invitations));

    return formData;
  }

  public trackBy(index: number, value: FormGroup): FormGroup | number {
    return value || index;
  }

  public ngOnDestroy(): void {
    this.unsub.next(true);
    this.unsub.complete();
  }
}
