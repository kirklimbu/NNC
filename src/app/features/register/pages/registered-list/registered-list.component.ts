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
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss'],
})
export class RegisteredListComponent implements OnInit {
  // props
  startDate = new Date();
  endDate = new Date();
  fromDate = new Date();
  toDate = new Date();
  status: any;
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
    { name: 'Print', value: 'PR' },
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
    // this.buildFilterForm();
  }

  buildFilterForm() {
    // this.spinner.show();
    this.filterForm = this.fb.group({
      status: [],
      fromDate: [],
      toDate: [],
      dateRange: [],
    });
  }
  fetchLetterList() {
    this.spinner.show();

    (this.letterListDataSource$ = this.registerService
      .getLetterList()
      .pipe(finalize(() => this.spinner.hide()))),
      (err) => {
        this.toastr.error(err.message);
      };
  }
  fetchPendingLetterList() {
    this.spinner.show();

    const status = 'P';
    (this.letterListDataSource$ = this.registerService
      .getFilteredLetters(status)
      .pipe(finalize(() => this.spinner.hide()))),
      (err) => {
        this.toastr.error(err.message);
      };
  }

  onEdit(letter: Letter) {
    this.router.navigate(['/home/register'], {
      queryParams: { regNo: letter.regNo },
    });
  }

  onDelete() {}

  onVerifyDetails(mode: string, letter: Letter) {
    this.isVerified = true;
    console.log('show data ' + JSON.stringify(letter));
    this.router.navigate(['/home/register/verify/detail'], {
      queryParams: { id: letter.id },
    });
  }
  // START FROM HERE AFTER BREAK
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
        // .pipe(map((data: any) => data.filter((p) => p.id == 3)))
        (err) => {
          this.toastr.error(err.message);
        };
    }
  }

  onPrint(letter: Letter) {
    console.log(letter);
    this.router.navigate(['/home/register/print-letter'], {
      queryParams: { id: letter.id },
    });
  }

  doFilter(value: string) {
    this.letterListDataSource.filter = value.trim().toLocaleLowerCase();
  }

  searchFor() {
    console.log(this.status, this.fromDate, this.toDate);

    this.spinner.show();
    (this.letterListDataSource$ = this.registerService
      .getSearchStudent(this.status, this.fromDate, this.toDate)
      .pipe(finalize(() => this.spinner.hide()))),
      (err) => {
        this.toastr.error(err.message);
      };
    console.log(this.letterListDataSource$);
  }
}
