import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss'],
})
export class DeletePopupComponent implements OnInit {
  title = 'Confirm Delete';

  message = 'Are you sure you want to remove this record?';
  // dialogRef;
  selectedId: number;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) {
    console.log(this.modalData);
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close('yes');
  }

  dismiss() {
    // this.dialogRef.close( );
  }
}
