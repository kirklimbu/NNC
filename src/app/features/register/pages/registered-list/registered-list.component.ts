import { FormGroup, FormBuilder } from '@angular/forms';
import { LetterVerifcationStatus } from './../../../../core/constants/letter-verifcation-status.enum';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Letter } from './../../../../core/models/letter.model';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss'],
})
export class RegisteredListComponent implements OnInit {
  // props
  filterForm: FormGroup;
  displayedColumns: string[] = ['Id', 'name', 'regNo', 'Action'];
  letterListDataSource: MatTableDataSource<any>;
  letterListDataSource$: Observable<any>;
  filtereedletterListDataSource$: Observable<any>;
  student: any;
  letterStatuses = [
    { name: 'Verified', value: 'V' },
    { name: 'Pending', value: 'P' },
    { name: 'Rejected', value: 'R' },
  ];
  isVerified = false;

  constructor(
    private registerService: RegisterService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.fetchLetterList();
    this.fetchLetterList();
    this.fetchPendingLetterList();
    this.buildFilterForm();
  }

  buildFilterForm() {
    // this.spinner.show()
    this.filterForm = this.fb.group({
      status: ['P'],
    });
  }
  fetchLetterList() {
    this.letterListDataSource$ = this.registerService.getLetterList();
  }
  fetchPendingLetterList() {
    const status = 'P';
    (this.letterListDataSource$ = this.registerService.getFilteredLetters(
      status
    )),
      (err) => {
        this.toastr.error(err.message);
      };
  }

  onEdit(letter: Letter) {
    this.router.navigate(['/home/letter'], {
      queryParams: { regNo: letter.regNo },
    });
  }

  onDelete() {}

  onVerifyDetails(mode: string, letter: Letter) {
    this.isVerified = true;
    console.log('show data ' + JSON.stringify(letter));
    this.router.navigate(['/home/letter/verify/detail'], {
      queryParams: { id: letter.id },
    });
  }

  onFilter(status) {
    if (status !== 'V') {
      this.isVerified = false;
      (this.letterListDataSource$ = this.registerService.getFilteredLetters(
        status
      )),
        (err) => {
          this.toastr.error(err.message);
        };
    } else {
      this.isVerified = true;
      (this.letterListDataSource$ = this.registerService.getFilteredLetters(
        status
      )),
        (err) => {
          this.toastr.error(err.message);
        };
    }
  }

  onPrint(letter: Letter) {
    console.log(letter);
    this.router.navigate(['/home/letter/print-letter'], {
      queryParams: { id: letter.id },
    });
  }
}
