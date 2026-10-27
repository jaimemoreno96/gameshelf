import {
  Component,
  Directive,
  HostListener,
  computed,
  contentChild,
  input,
  output,
} from '@angular/core';

@Directive({
  selector: '[dialog-header]',
})
export class DialogHeaderSlot {}

@Directive({
  selector: '[dialog-footer]',
})
export class DialogFooterSlot {}

@Component({
  host: {
    '[attr.open]': 'open() ? "" : null',
    role: 'presentation',
  },
  imports: [],
  selector: 'gs-dialog',
  styleUrl: './gs-dialog.css',
  templateUrl: './gs-dialog.html',
})
export class GsDialog {
  readonly open = input(false);
  readonly openChange = output<boolean>();

  readonly title = input('');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly dismissible = input(true);
  readonly labelId = input('dialog-title');

  readonly sizeClass = computed(() => {
    const classes = {
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
    } as const;

    return classes[this.size()];
  });

  readonly hasHeaderSlot = contentChild(DialogHeaderSlot);
  readonly hasFooterSlot = contentChild(DialogFooterSlot);

  close(): void {
    if (this.dismissible()) {
      this.openChange.emit(false);
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event): void {
    if (this.open() && this.dismissible()) {
      event.preventDefault();
      this.close();
    }
  }
}
