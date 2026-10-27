import { Component, input } from '@angular/core';
import { GsInput } from '../gs-input/gs-input';

@Component({
  imports: [GsInput],
  selector: 'app-gs-autocomplete',
  styleUrl: './gs-autocomplete.css',
  templateUrl: './gs-autocomplete.html',
})
export class GsAutocomplete {
  readonly label = input.required<string>();
  readonly id = input.required<string>();

  handleOnChange(event: Event): void {
    console.log("OnChange");
    
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log('Input value changed:', inputValue);
  }

  handleOnBlur(event: Event): void {
    console.log('Input field lost focus');
  }
}
