import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

@Component({
  imports: [],
  selector: 'gs-input',
  styleUrl: './gs-input.css',
  templateUrl: './gs-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GsInput),
      multi: true,
    },
  ],
})
export class GsInput implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly id = input.required<string>();
  readonly type = input<InputType>('text');
  readonly name = input<string | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly autocomplete = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly error = input<string | null>(null);
  readonly required = input(false);
  readonly disabled = input(false);
  readonly handleOnChange = input<(e: Event) => void>();
  readonly handleOnBlur = input<(e: Event) => void>();

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

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  handleChange(event: Event): void {
    if (this.handleOnChange) {
      this.handleOnChange();
    }
  }

  handleBlur(event: Event): void {
    if (this.handleOnBlur) {
      this.handleOnBlur();
    }
    this.onTouched();
  }
}
