import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GsInput } from './gs-input';

@Component({
  imports: [GsInput, ReactiveFormsModule],
  template: `
    <gs-input
      label="Game title"
      id="title"
      type="email"
      name="title"
      placeholder="Enter a title"
      autocomplete="off"
      [required]="required()"
      [hint]="hint()"
      [error]="error()"
      [formControl]="control"
    />

    <gs-input label="Disabled field" id="disabled-field" [disabled]="disabled()" />
  `,
})
class TestHost {
  control = new FormControl('initial', { nonNullable: true });
  required = signal(true);
  disabled = signal(false);
  hint = signal<string | null>(null);
  error = signal<string | null>(null);
}

describe('Input', () => {
  let host: TestHost;
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GsInput, TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
  });

  function nativeInput(id: string = 'title'): HTMLInputElement {
    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    return Array.from(inputs).find((input) => input.id === id) as HTMLInputElement;
  }

  it('should render the label associated with the inner input via for/id', () => {
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(label.getAttribute('for')).toBe('title');
    expect(label.textContent?.trim()).toContain('Game title');
    expect(label.htmlFor).toBe(nativeInput().id);
  });

  it('should write the initial control value into the native input', () => {
    fixture.detectChanges();
    expect(nativeInput().value).toBe('initial');
  });

  it('should reflect a programmatic control value without treating it as a user event', () => {
    fixture.detectChanges();
    host.control.setValue('updated value');
    fixture.detectChanges();
    expect(nativeInput().value).toBe('updated value');
    expect(host.control.dirty).toBe(false);
    expect(host.control.touched).toBe(false);
  });

  it('should push a native input change into the control and mark it touched on blur', () => {
    fixture.detectChanges();
    nativeInput().value = 'typed value';
    nativeInput().dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(host.control.value).toBe('typed value');

    nativeInput().dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(host.control.touched).toBe(true);
  });

  it('should reflect type, name, id, placeholder, autocomplete, and required', () => {
    fixture.detectChanges();
    const input = nativeInput();
    expect(input.getAttribute('type')).toBe('email');
    expect(input.getAttribute('name')).toBe('title');
    expect(input.id).toBe('title');
    expect(input.getAttribute('placeholder')).toBe('Enter a title');
    expect(input.getAttribute('autocomplete')).toBe('off');
    expect(input.required).toBe(true);
  });

  it('should disable and re-enable the native input through the form control', () => {
    fixture.detectChanges();
    expect(nativeInput().disabled).toBe(false);

    host.control.disable();
    fixture.detectChanges();
    expect(nativeInput().disabled).toBe(true);

    host.control.enable();
    fixture.detectChanges();
    expect(nativeInput().disabled).toBe(false);
  });

  it('should disable and re-enable the native input through the explicit disabled input', () => {
    fixture.detectChanges();
    expect(nativeInput('disabled-field').disabled).toBe(false);

    host.disabled.set(true);
    fixture.detectChanges();
    expect(nativeInput('disabled-field').disabled).toBe(true);

    host.disabled.set(false);
    fixture.detectChanges();
    expect(nativeInput('disabled-field').disabled).toBe(false);
  });

  it('should render hint and error with described-by ids and aria-invalid', () => {
    fixture.detectChanges();
    host.hint.set('A useful hint');
    host.error.set('This field is invalid');
    fixture.detectChanges();

    const hint = fixture.nativeElement.querySelector('#title-hint') as HTMLElement;
    const error = fixture.nativeElement.querySelector('#title-error') as HTMLElement;
    const input = nativeInput();

    expect(hint?.textContent).toContain('A useful hint');
    expect(error?.textContent).toContain('This field is invalid');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toContain('title-hint');
    expect(input.getAttribute('aria-describedby')).toContain('title-error');
  });

  it('should clear hint, error, and aria-invalid when removed', () => {
    fixture.detectChanges();
    host.hint.set('A useful hint');
    host.error.set('This field is invalid');
    fixture.detectChanges();

    host.hint.set(null);
    host.error.set(null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#title-hint')).toBeNull();
    expect(fixture.nativeElement.querySelector('#title-error')).toBeNull();
    expect(nativeInput().getAttribute('aria-invalid')).toBeNull();
    expect(nativeInput().getAttribute('aria-describedby')).toBeNull();
  });

  it('should render the required indicator and sr-only required label', () => {
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    const indicator = label.querySelector('[aria-hidden="true"]') as HTMLElement;
    const srOnly = label.querySelector('.sr-only') as HTMLElement;
    expect(indicator?.textContent).toBe('*');
    expect(srOnly?.textContent).toContain('(required)');
  });
});