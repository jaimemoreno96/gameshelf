import { Component, input } from '@angular/core';
import { GsAutocomplete } from '../gs-autocomplete/gs-autocomplete';
import { GsInput } from '../gs-input/gs-input';

@Component({
  imports: [GsAutocomplete, GsInput],
  selector: 'app-add-game-form',
  styleUrl: './add-game-form.css',
  templateUrl: './add-game-form.html',
})
export class AddGameForm {
  handleOnChange(event: Event): void {
    console.log('OnChange');

    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log('Input value changed:', inputValue);
  }

  handleOnBlur(event: Event): void {
    console.log('Input field lost focus');
  }
}
