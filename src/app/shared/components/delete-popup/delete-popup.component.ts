import { Component, Inject, Input, OnInit } from '@angular/core';
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
  /* props */
  title = 'Confirm Delete';
  image: File | null;
  zoomImage: boolean;
  buttonType1: string;
  buttonType2: string;
  buttonType3: string;
  message = 'Are you sure you want to remove this record?';
  // dialogRef;
  selectedId: number;

  @Input()
  button1 = true;
  @Input()
  button2 = true;
  @Input()
  button3 = true;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) {
    this.title = this.modalData.title;
    this.message = this.modalData.message;
    this.image = this.modalData.image;
    this.zoomImage = this.modalData.zoomImage;
    this.buttonType1 = this.modalData.button;

    console.log(this.zoomImage);
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close('yes');
  }

  dismiss() {
    // this.dialogRef.close( );
  }
}
