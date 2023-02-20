import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
})
export class ErrorDialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  closeModal() {
    this.dialogRef.close();
  }
}
