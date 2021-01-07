// import { NepaliDate } from 'nepali-date';
import { FormatDate } from './../../../../core/constants/format-date';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LetterVerifcationStatus } from './../../../../core/constants/letter-verifcation-status.enum';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Letter } from './../../../../core/models/letter.model';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DateFormatter, NepaliDate } from 'angular-nepali-datepicker';
import { CustomJs } from 'src/app/shared/customjs/custom.js';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss'],
})
export class RegisteredListComponent implements OnInit {
  // props

  formatDate = new FormatDate();
  fromDate: any;
  toDate: any;

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
    // { name: 'Print', value: 'PR' },
  ];
  isVerified = false;
  /* displaying nepali date */
  fromDateFormatter: DateFormatter = (date) => {
    return `${date.year} / ${date.month + 1} / ${date.day} `;
  };
  toDateFormatter: DateFormatter = (date) => {
    return `${date.year} / ${date.month + 1} / ${date.day} `;
  };
  constructor(
    private registerService: RegisterService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getToday();

    this.fetchLetterList();
    this.fetchPendingLetterList();
  }

  getToday() {
    console.log('fadfa ' + JSON.stringify(new CustomJs().getCurrentDateBS()));
    console.log(
      'dfasdfasdfa ' + JSON.stringify(new CustomJs().getBeforeAfterDateAD(1))
    );

    console.log(Date.now());
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

  onDelete() {}

  onVerifyDetails(mode: string, letter: Letter) {
    this.isVerified = true;
    console.log('show data ' + JSON.stringify(letter));
    this.router.navigate(['/home/register/verify/detail'], {
      queryParams: { id: letter.id },
    });
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

  onSearch() {
    this.spinner.show();
    if (this.status === 'V') {
      this.isVerified = true;
      (this.letterListDataSource$ = this.registerService
        .getSearchStudent(
          this.status,
          this.formatDate.getFormatDate(this.fromDate),
          this.formatDate.getFormatDate(this.toDate)
        )
        .pipe(finalize(() => this.spinner.hide()))),
        (err) => {
          this.toastr.error(err.message);
          this.spinner.hide();
        };
    } else {
      this.isVerified = false;
      (this.letterListDataSource$ = this.registerService
        .getSearchStudent(
          this.status,
          this.formatDate.getFormatDate(this.fromDate),
          this.formatDate.getFormatDate(this.toDate)
        )
        .pipe(finalize(() => this.spinner.hide()))),
        (err) => {
          this.toastr.error(err.message);
          this.spinner.hide();
        };
    }
  }
}
