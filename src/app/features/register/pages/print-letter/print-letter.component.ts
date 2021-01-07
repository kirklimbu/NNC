import { RegisterService } from './../../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Letter } from 'src/app/core/models/letter.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { DeletePopupComponent } from 'src/app/shared/components/delete-popup/delete-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-print-letter',
  templateUrl: './print-letter.component.html',
  styleUrls: ['./print-letter.component.scss'],
})
export class PrintLetterComponent implements OnInit {
  // props

  myDate: Date;
  letterId: number;

  printDetails$: Observable<Letter>;
  printDetails: Letter;

  /* fake data */
  registration = 'Registration';
  /* fake data end */
  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private letterService: RegisterService
  ) {}

  ngOnInit(): void {
    this.calcDate();
    this.fetchParamFromUrl();
  }

  calcDate() {
    this.myDate = new Date();
  }

  fetchParamFromUrl() {
    this.spinner.show();
    this.route.queryParamMap.subscribe((params) => {
      this.letterId = +params.get('id');
      // this.printDetails$ = this.letterService.getPrintDetails(this.letterId); //async method
      this.printDetails$ = this.letterService
        .getPrintDetails(this.letterId)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe((data) => {
          console.log(data);

          this.printDetails = data;
        });
    }),
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error('Error fetching param value.');
      };
  }

  savePrint() {
    console.log('calling print save');

    const id = this.letterId;
    this.letterService.savePrintInfo(id).subscribe(
      (res) => {
        this.toastr.success(res.message);
        this.router.navigate(['/home/letter/letter-list']);
      },
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error('Error saving print details.');
      }
    );
  }

  onPrintStatusCheck() {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      disableClose: true,
      width: '450px',
      data: {
        title: '',
        message: 'Was the print successful?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed ' + result);
      result === 'yes' ? this.savePrint() : null;
    });
  }
}
