import {
  Component,
  OnInit
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  distinctUntilChanged
} from 'rxjs/operators';

import {
  SkyThemeService,
  SkyThemeSettings
} from '@skyux/theme';

@Component({
  selector: 'datepicker-visual',
  templateUrl: './datepicker-visual.component.html'
})
export class DatepickerVisualComponent implements OnInit {
  public disabled = false;
  public minDate: Date;
  public maxDate: Date;
  public noValidate = false;
  public reactiveForm: FormGroup;
  public selectedDate: Date = new Date(1955, 10, 5);
  public startingDay: number;
  public strict: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private themeSvc: SkyThemeService
  ) { }

  public get reactiveDate(): AbstractControl {
    return this.reactiveForm.get('selectedDate');
  }

  public ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      selectedDate: new FormControl(new Date(1955, 10, 5), Validators.required)
    });

    this.reactiveDate.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe((status: any) => {
        console.log('Status changed:', status);
      });

    this.reactiveDate.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value: any) => {
        console.log('Value changed:', value);
      });
  }

  public setMinMaxDates(): void {
    this.minDate = new Date('01/01/2018');
    this.maxDate = new Date('01/01/2020');
  }

  public setStartingDay(): void {
    this.startingDay = 1;
  }

  public toggleDisabled(): void {
    if (this.reactiveDate.disabled) {
      this.reactiveDate.enable();
    } else {
      this.reactiveDate.disable();
    }

    this.disabled = !this.disabled;
  }

  public setValue(): void {
    this.reactiveDate.setValue(new Date('2/2/2001'));
    this.selectedDate = new Date('2/2/2001');
  }

  public setInvalidValue(): void {
    this.reactiveDate.setValue('invalid');
    (this.selectedDate as any) = 'invalid';
  }

  public themeSettingsChange(themeSettings: SkyThemeSettings): void {
    this.themeSvc.setTheme(themeSettings);
  }
}
