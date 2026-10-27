import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GsSelect, SelectOption } from './gs-select';

@Component({
  imports: [GsSelect, ReactiveFormsModule],
  template: `
    <gs-select
      label="Platform"
      id="platform"
      name="platform"
      [options]="options()"
      [placeholder]="placeholder()"
      [hint]="hint()"
      [error]="error()"
      [required]="required()"
      [formControl]="control"
    />

    <gs-select
      label="Priority"
      id="priority"
      [options]="options()"
      [disabled]="disabled()"
    />
  `,
})
class TestHost {
  control = new FormControl('pc', { nonNullable: true });
  options = signal<SelectOption[]>([
    { value: 'pc', label: 'PC' },
    { value: 'playstation', label: 'PlayStation' },
  ]);
  placeholder = signal<string | null>('Choose a platform');
  hint = signal<string | null>(null);
  error = signal<string | null>(null);
  required = signal(false);
  disabled = signal(false);
}

describe('GsSelect', () => {
  let host: TestHost;
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GsSelect, TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
  });

  function nativeSelect(id: string = 'platform'): HTMLSelectElement {
    const selects = fixture.nativeElement.querySelectorAll('select') as NodeListOf<HTMLSelectElement>;
    return Array.from(selects).find((select) => select.id === id) as HTMLSelectElement;
  }

  function nativeOptions(id: string = 'platform'): HTMLOptionElement[] {
    return Array.from(nativeSelect(id).options);
  }

  it('should render the label associated with the inner select via for/id', () => {
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(label.getAttribute('for')).toBe('platform');
    expect(label.textContent?.trim()).toContain('Platform');
    expect(label.htmlFor).toBe(nativeSelect().id);
  });

  it('should render the placeholder and options', () => {
    fixture.detectChanges();
    const options = nativeOptions();
    expect(options.length).toBe(3);

    const placeholder = options[0];
    expect(placeholder.value).toBe('');
    expect(placeholder.disabled).toBe(true);
    expect(placeholder.textContent?.trim()).toBe('Choose a platform');

    expect(options[1].value).toBe('pc');
    expect(options[1].textContent?.trim()).toBe('PC');
    expect(options[2].value).toBe('playstation');
    expect(options[2].textContent?.trim()).toBe('PlayStation');
  });

  it('should reflect name, id, and required attributes', () => {
    host.required.set(true);
    fixture.detectChanges();
    const select = nativeSelect();
    expect(select.id).toBe('platform');
    expect(select.getAttribute('name')).toBe('platform');
    expect(select.required).toBe(true);
  });

  it('should write the initial control value into the native select', () => {
    fixture.detectChanges();
    expect(nativeSelect().value).toBe('pc');
  });

  it('should reflect a programmatic control value without marking it dirty or touched', () => {
    fixture.detectChanges();
    host.control.setValue('playstation');
    fixture.detectChanges();
    expect(nativeSelect().value).toBe('playstation');
    expect(host.control.dirty).toBe(false);
    expect(host.control.touched).toBe(false);
  });

  it('should normalize a non-string control value to an empty selection', () => {
    fixture.detectChanges();
    host.control.setValue(null as unknown as string);
    fixture.detectChanges();
    expect(nativeSelect().value).toBe('');
    expect(host.control.dirty).toBe(false);
    expect(host.control.touched).toBe(false);
  });

  it('should push a native change into the control and mark it touched on blur', () => {
    fixture.detectChanges();
    const select = nativeSelect();
    select.value = 'playstation';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(host.control.value).toBe('playstation');
    expect(host.control.dirty).toBe(true);

    select.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(host.control.touched).toBe(true);
  });

  it('should disable and re-enable the native select through the form control', () => {
    fixture.detectChanges();
    expect(nativeSelect().disabled).toBe(false);

    host.control.disable();
    fixture.detectChanges();
    expect(nativeSelect().disabled).toBe(true);

    host.control.enable();
    fixture.detectChanges();
    expect(nativeSelect().disabled).toBe(false);
  });

  it('should disable and re-enable the native select through the explicit disabled input', () => {
    fixture.detectChanges();
    expect(nativeSelect('priority').disabled).toBe(false);

    host.disabled.set(true);
    fixture.detectChanges();
    expect(nativeSelect('priority').disabled).toBe(true);

    host.disabled.set(false);
    fixture.detectChanges();
    expect(nativeSelect('priority').disabled).toBe(false);
  });

  it('should render hint and error with described-by ids and aria-invalid', () => {
    fixture.detectChanges();
    host.hint.set('Select the target platform');
    host.error.set('Platform is required');
    fixture.detectChanges();

    const hint = fixture.nativeElement.querySelector('#platform-hint') as HTMLElement;
    const error = fixture.nativeElement.querySelector('#platform-error') as HTMLElement;
    const select = nativeSelect();

    expect(hint?.textContent).toContain('Select the target platform');
    expect(error?.textContent).toContain('Platform is required');
    expect(error?.getAttribute('role')).toBe('alert');
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(select.getAttribute('aria-describedby')).toContain('platform-hint');
    expect(select.getAttribute('aria-describedby')).toContain('platform-error');
  });

  it('should clear hint, error, and aria-invalid when removed', () => {
    fixture.detectChanges();
    host.hint.set('Select the target platform');
    host.error.set('Platform is required');
    fixture.detectChanges();

    host.hint.set(null);
    host.error.set(null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#platform-hint')).toBeNull();
    expect(fixture.nativeElement.querySelector('#platform-error')).toBeNull();
    expect(nativeSelect().getAttribute('aria-invalid')).toBeNull();
    expect(nativeSelect().getAttribute('aria-describedby')).toBeNull();
  });

  it('should render the required indicator and sr-only required label', () => {
    host.required.set(true);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    const indicator = label.querySelector('[aria-hidden="true"]') as HTMLElement;
    const srOnly = label.querySelector('.sr-only') as HTMLElement;
    expect(indicator?.textContent).toBe('*');
    expect(srOnly?.textContent).toContain('(required)');
  });

  it('should apply placeholder text color when empty and normal color when set', () => {
    fixture.detectChanges();
    expect(nativeSelect().classList.contains('text-gray-500')).toBe(false);
    expect(nativeSelect().classList.contains('text-gray-100')).toBe(true);

    host.control.setValue('');
    fixture.detectChanges();
    expect(nativeSelect().classList.contains('text-gray-500')).toBe(true);
    expect(nativeSelect().classList.contains('text-gray-100')).toBe(false);
  });

  it('should apply error classes when an error is present and remove them when cleared', () => {
    fixture.detectChanges();
    expect(nativeSelect().classList.contains('border-red-500')).toBe(false);

    host.error.set('Platform is required');
    fixture.detectChanges();
    expect(nativeSelect().classList.contains('border-red-500')).toBe(true);
  });

  it('should render updated options when the options input changes', () => {
    fixture.detectChanges();
    expect(nativeOptions().length).toBe(3);

    host.options.set([
      { value: 'xbox', label: 'Xbox' },
      { value: 'nintendo', label: 'Nintendo' },
    ]);
    fixture.detectChanges();

    const options = nativeOptions();
    expect(options.length).toBe(3);
    expect(options[1].value).toBe('xbox');
    expect(options[1].textContent?.trim()).toBe('Xbox');
    expect(options[2].value).toBe('nintendo');
    expect(options[2].textContent?.trim()).toBe('Nintendo');
  });
});
