import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private registerService: RegisterService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchLetterList();
  }

  fetchLetterList() {
    this.registerService.getLetterList().subscribe(
      (data) => {
        console.log(data);

        this.letterListDataSource = data;
      },
      (err) => {
        err = err.message
          ? this.toastr.error(err.message)
          : this.toastr.error('Error while fetching letter list.');
      }
    );
  }

  onEdit(letter) {}

  onDelete() {}


  onViewDetails(letter) {
    console.log(letter);


  }
}
