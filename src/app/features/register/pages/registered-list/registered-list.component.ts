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
  customDate = new CustomJs();
  fromDate: any;
  fromDate2: any;
  toDate: any;

  status: any = 'P';
  student: any;

  filterForm: FormGroup;
  displayedColumns: string[] = ['Id', 'name', 'regNo', 'Action'];
  letterListDataSource: MatTableDataSource<any>;
  letterListDataSource$: Observable<any>;
  filtereedletterListDataSource$: Observable<any>;
  letterStatuses = [
    { name: 'Pending', value: 'P' },
    { name: 'Verified', value: 'V' },
    { name: 'Rejected', value: 'R' },
    // { name: 'Print', value: 'PR' },
  ];
  isVerified = false;
  /* displaying nepali date */
  fromDateFormatter: DateFormatter = (date) => {
    // return `${date.year} / ${date.month + 1} / ${date.day} `;
    return this.formatDate.getFormatDate(date);
  };
  toDateFormatter: DateFormatter = (date) => {
    // return `${date.year} / ${date.month + 1} / ${date.day} `;
    return this.formatDate.getFormatDate(date);
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
    this.fetchPendingLetterList(); //for default list on table
  }

  fetchPendingLetterList() {
    this.spinner.show();
    const status = 'P';

    let toDate: NepaliDate = this.customDate.getCurrentDateBS();
    toDate = this.customDate.getDatePickerObject(toDate); // converting to object to display in Datepicker
    this.toDate = toDate; // assigning to Datepicker

    let fromDate: NepaliDate = this.customDate.getBeforeAfterMonthDateBS(-1);
    fromDate = this.customDate.getNepaliFunctionDateObject(fromDate);
    this.fromDate = fromDate;

    this.letterListDataSource$ = this.registerService
      .getSearchStudent(
        status,
        this.formatDate.getFormatDate(fromDate),
        this.formatDate.getFormatDate(toDate)
      )
      .pipe(finalize(() => this.spinner.hide()));
    (err) => {
      this.toastr.error(err.message);
      this.spinner.hide();
    };
  }

  onDelete() {}

  // code can be optimized
  // keep onVerifyDetails and  onPrint in one funciton just pass different variables and use relativeTo path activatedRoute
  onVerifyDetails(mode: string, letter: Letter) {
    this.isVerified = true;
    console.log('show data ' + JSON.stringify(letter));
    this.router.navigate(['/home/register/verify/detail'], {
      queryParams: { id: letter.id },
    });
  }
  // code can be optimized
  onPrint(letter: Letter) {
    console.log(letter);
    this.router.navigate(['/home/register/print-letter'], {
      queryParams: { id: letter.id },
    });
  }

  doFilter(value: string) {
    this.letterListDataSource.filter = value.trim().toLocaleLowerCase();
  }

  selectedStatus(status) {
    this.status = status;
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
        .pipe(finalize(() => this.spinner.hide())))
        ,
        (err) => {
          this.toastr.error(err.message);
          this.spinner.hide();
        };
    } else {
      console.log(this.status);

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
