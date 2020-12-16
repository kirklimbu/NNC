import { AffiliationCollege } from './../../../../core/models/affiliation-college.model';
import { LetterReceicer } from './../../../../core/models/letter-receicer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Letter } from 'src/app/core/models/letter.model';
import { idText } from 'typescript';
import { NgxImgZoomService } from 'ngx-img-zoom';

@Component({
  selector: 'app-verify-letter',
  templateUrl: './verify-letter.component.html',
  styleUrls: ['./verify-letter.component.scss'],
})
export class VerifyLetterComponent implements OnInit {
  // props
  letterVerifyForm: FormGroup;
  letterDetails$: Observable<Letter>;
  letterDetails: Letter;
  letterId: number;
  selected: string;
  letter = new Letter();
  affiliationCollegeList = [];
  letterReceiverList = [];
  letterReceiver: LetterReceicer;
  affiliationCollege: AffiliationCollege;
  licenceImage: any;
  billImage: any[];
  enableZoom: Boolean = true;
  previewImageSrc: any;
  zoomImageSrc: any;

  constructor(
    private letterService: RegisterService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxImgZoom: NgxImgZoomService
  ) {
    this.ngxImgZoom.setZoomBreakPoints([
      { w: 100, h: 100 },
      { w: 150, h: 150 },
      { w: 200, h: 200 },
      { w: 250, h: 250 },
      { w: 300, h: 300 },
    ]);
  }

  ngOnInit(): void {
    this.fetchParamFromUrl();
    this.fetchLetterDetails();
  }

  fetchParamFromUrl() {
    this.route.queryParamMap.subscribe((params) => {
      this.letterId = +params.get('id');
      console.log(this.letterId);
    }),
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error('Error fetching param value.');
      };
  }

  fetchLetterDetails() {
    var id: number = this.letterId;

    // this.letterDetails$ = this.letterService.getLetterDetails(id);
    // console.log(JSON.stringify(this.letterDetails$));
    this.letterService.getLetterDetails(id).subscribe((data) => {
      this.letter = data;
      console.log(data);

      this.letterReceiver = data.letterReceiver;
      this.affiliationCollege = data.affiliationCollege;
      this.licenceImage = data.photoLicence;
      this.billImage = data.requestList;
      /* this.letterVerifyForm.patchValue({
        letterReceiver: this.letterReceiver.name,
      }); */

      this.buildRegisterForm();
    });
  }

  buildRegisterForm() {
    this.letterVerifyForm = this.formBuilder.group({
      regNo: [this.letter.regNo],
      name: [this.letter.name, Validators.required],
      address: [this.letter.address, Validators.required],
      wardNo: [this.letter.wardNo, Validators.required],
      collegeName: [this.letter.collegeName, Validators.required],
      collegeAddress: [this.letter.collegeAddress, Validators.required],
      dob: [this.letter.dob, Validators.required],
      email: [this.letter.email, Validators.required],
      mobileNo: [this.letter.mobileNo, Validators.required],
      photoLicenceChange: [this.letter.photoLicenceChange],
      photoLicence: [this.letter.photoLicence, Validators.required],
      photoBill: [this.letter.photoBill, Validators.required],
      photoBillChange: [this.letter.photoBillChange],
      letterReceiver: [this.letter.letterReceiver, Validators.required],
      affiliationCollege: [this.letter.affiliationCollege, Validators.required],
    });
  }

  onVerify() {
    const id = this.letterId;
    this.letterService.isVerfied(id).subscribe(
      (res) => {
        this.router.navigate(['/home/letter/letter-list']);
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }
  onReject() {
    console.log('reject clicked');

    const id = this.letterId;
    this.letterService.isRejected(id).subscribe(
      (res) => {
        this.router.navigate(['/home/letter/letter-list']);
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }
}
