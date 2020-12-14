import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

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
  constructor(private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.calcDate();
  }

  calcDate() {
    this.myDate = new Date();
  }
}
