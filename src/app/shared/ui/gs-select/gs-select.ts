import {
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SelectOption = {
  value: string;
  label: string;
};

@Component({
  imports: [],
  selector: 'gs-select',
  styleUrl: './gs-select.css',
  templateUrl: './gs-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GsSelect),
      multi: true,
    },
  ],
})
export class GsSelect implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly id = input.required<string>();
  readonly options = input.required<SelectOption[]>();
  readonly name = input<string | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly error = input<string | null>(null);
  readonly required = input(false);
  readonly disabled = input(false);

  readonly value = signal('');
  readonly controlDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.controlDisabled());

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: unknown): void {
    this.value.set(typeof value === 'string' ? value : '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.controlDisabled.set(isDisabled);
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
