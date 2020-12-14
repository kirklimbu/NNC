import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-action-buttons',
  templateUrl: './table-action-buttons.component.html',
  styleUrls: ['./table-action-buttons.component.scss'],
})
export class TableActionButtonsComponent implements OnInit {
  // props
  @Input()
  enableEdit = true;

  @Input()
  enableDelete = true;

  @Input()
  enableViewDetails = true;

  @Output()
  edit: EventEmitter<void> = new EventEmitter();

  @Output()
  delete: EventEmitter<void> = new EventEmitter();

  @Output()
  viewDetails: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onEdit() {
    this.edit.emit();
  }
  onDelete() {
    this.delete.emit();
  }
  onVerifyDetails() {
    this.viewDetails.emit();
  }
}
