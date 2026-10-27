import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { GsDialog, DialogFooterSlot, DialogHeaderSlot } from './gs-dialog';

@Component({
  imports: [GsDialog, DialogHeaderSlot, DialogFooterSlot],
  template: `
    <gs-dialog
      [(open)]="open"
      [title]="title"
      [size]="size"
      [dismissible]="dismissible"
    >
      <p>Body content</p>

      @if (withHeader) {
        <div dialog-header>Custom header</div>
      }

      @if (withFooter) {
        <div dialog-footer>Footer actions</div>
      }
    </gs-dialog>
  `,
})
class TestHost {
  open = true;
  title = 'Test dialog';
  size: 'sm' | 'md' | 'lg' = 'md';
  dismissible = true;
  withHeader = false;
  withFooter = false;
}

describe('GsDialog', () => {
  let component: GsDialog;
  let host: TestHost;
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GsDialog, DialogHeaderSlot, DialogFooterSlot, TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(GsDialog)).componentInstance as GsDialog;
  });

  function panel(): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector('section[role="dialog"]');
  }

  function backdrop(): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector('div[role="presentation"]');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nothing while closed', () => {
    host.open = false;
    fixture.detectChanges();
    expect(panel()).toBeNull();
  });

  it('should render the dialog while open', () => {
    fixture.detectChanges();
    expect(panel()).not.toBeNull();
  });

  it('should render the title and aria-labelledby', () => {
    fixture.detectChanges();
    const title = panel()?.querySelector('h2');
    expect(title?.textContent?.trim()).toBe('Test dialog');
    expect(panel()?.getAttribute('aria-labelledby')).toBe('dialog-title');
  });

  it('should project default body content', () => {
    fixture.detectChanges();
    expect(panel()?.textContent).toContain('Body content');
  });

  it('should use the custom header slot instead of the generated title', () => {
    host.withHeader = true;
    fixture.detectChanges();
    const custom = panel()?.querySelector('[dialog-header]');
    expect(custom?.textContent).toContain('Custom header');
    expect(panel()?.querySelector('h2')).toBeNull();
  });

  it('should render the footer only when the footer slot is present', () => {
    fixture.detectChanges();
    expect(panel()?.querySelector('footer')).toBeNull();
  });

  it('should render the footer when the footer slot is present', () => {
    host.withFooter = true;
    fixture.detectChanges();
    expect(panel()?.querySelector('footer')?.textContent).toContain('Footer actions');
  });

  it('should apply the computed small size class', () => {
    host.size = 'sm';
    fixture.detectChanges();
    expect(panel()?.classList.contains('max-w-sm')).toBe(true);
  });

  it('should apply the computed medium size class', () => {
    host.size = 'md';
    fixture.detectChanges();
    expect(panel()?.classList.contains('max-w-lg')).toBe(true);
  });

  it('should apply the computed large size class', () => {
    host.size = 'lg';
    fixture.detectChanges();
    expect(panel()?.classList.contains('max-w-2xl')).toBe(true);
  });

  it('should emit false when the close button is clicked', () => {
    fixture.detectChanges();
    panel()
      ?.querySelector<HTMLButtonElement>('button[aria-label="Close dialog"]')
      ?.click();
    fixture.detectChanges();
    expect(host.open).toBe(false);
  });

  it('should emit false when the backdrop is clicked', () => {
    fixture.detectChanges();
    backdrop()?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(host.open).toBe(false);
  });

  it('should not close when an inner dialog element is clicked', () => {
    fixture.detectChanges();
    const inner = panel()?.querySelector('p');
    inner?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(host.open).toBe(true);
  });

  it('should emit false when Escape is pressed', () => {
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(host.open).toBe(false);
  });

  it('should not close from the button, backdrop, or Escape when dismissible is false', () => {
    host.dismissible = false;
    fixture.detectChanges();

    expect(panel()?.querySelector('button[aria-label="Close dialog"]')).toBeNull();

    backdrop()?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(host.open).toBe(true);
  });
});
