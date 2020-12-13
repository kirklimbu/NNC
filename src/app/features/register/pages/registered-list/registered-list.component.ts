import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss'],
})
export class RegisteredListComponent implements OnInit {
  // props
  displayedColumns: string[] = [
    'Id',
    'name',
    'regNo',
    /*  'address',
   'class',
    'dob',
    'fatherName',
    'motherName',
    'phoneNum', */
    'Action',
  ];
  letterListDataSource: MatTableDataSource<any>;
  student: any;

  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {
    this.fetchLetterList();
  }

  fetchLetterList() {
    this.registerService.getLetterList().subscribe((data) => {
      console.log(data);

      this.letterListDataSource = data;
    });
  }

  onEdit(letter){

  }

  onDelete(){

  }
}
