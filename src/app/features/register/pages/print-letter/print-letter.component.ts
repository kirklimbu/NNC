import { RegisterService } from './../../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Letter } from 'src/app/core/models/letter.model';

@Component({
  selector: 'app-print-letter',
  templateUrl: './print-letter.component.html',
  styleUrls: ['./print-letter.component.scss'],
})
export class PrintLetterComponent implements OnInit {
  // props

  myDate: Date;
  ref = 123456;
  studentName = 'Saraswati Rai';
  address = 'damak';
  wardNo = 1;
  regNo = 12365;
  collegeName = 'Damak Aamda Hospital College';
  collegeAddress = 'Damak 2 , Jhapa , Nepal';
  regDate = '2016 A.D';
  affiliation = 'C.T.E.V.T';
  dob = '1st Jan 2016';
  regIssueDate = '10th March 2016';
  regExpDate = '10th March 2028';
  Registration: 'Registered Nurse';
  letterId: number;

  printDetails$: Observable<Letter>;
  printDetails: Letter;

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
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
    this.route.queryParamMap.subscribe((params) => {
      this.letterId = +params.get('id');
      // this.printDetails$ = this.letterService.getPrintDetails(this.letterId);
      this.printDetails$ = this.letterService
        .getPrintDetails(this.letterId)
        .subscribe((data) => {
          this.printDetails = data;
          console.log(this.printDetails);
        });
    }),
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error('Error fetching param value.');
      };
  }

  onPrintSave() {
    const id = this.letterId;
    this.letterService.savePrintInfo(id).subscribe(
      (res) => {
        this.router.navigate(['/home/letter/letter-list']);
      },
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error('Error saving print details.');
      }
    );
  }
}
