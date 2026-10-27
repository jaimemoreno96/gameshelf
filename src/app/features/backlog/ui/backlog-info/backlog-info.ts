import { Component, Input } from '@angular/core';
import {
  DialogFooterSlot,
  DialogHeaderSlot,
  GsDialog,
} from '../../../../shared/ui/gs-dialog/gs-dialog';
import { AddGameForm } from '../../../../shared/ui/add-game-form/add-game-form';

@Component({
  selector: 'backlog-info',
  styleUrl: './backlog-info.css',
  templateUrl: './backlog-info.html',
  imports: [GsDialog, DialogHeaderSlot, DialogFooterSlot, AddGameForm],
})
export class BacklogInfo {
  @Input() userName: string = '';
  @Input() isAddGameDialogOpen: boolean = false;

  openAddGameDialog() {
    console.log('open Dialog!');

    this.isAddGameDialogOpen = true;
  }
  saveGame() {
    console.log('save game!');
    this.isAddGameDialogOpen = false;
  }
}
