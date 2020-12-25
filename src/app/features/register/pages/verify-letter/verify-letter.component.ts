import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Letter } from 'src/app/core/models/letter.model';
import { LetterVerify } from 'src/app/core/models/verify-letter.model';
import { LetterReceiver } from 'src/app/core/models/letter-receiver.model';
import { AffiliationCollege } from 'src/app/core/models/affiliation-college.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-verify-letter',
  templateUrl: './verify-letter.component.html',
  styleUrls: ['./verify-letter.component.scss'],
})
export class VerifyLetterComponent implements OnInit {
  // props
  letterVerifyForm: FormGroup;
  letterDetails$: Observable<Letter>;
  letterDetails: LetterVerify;
  letterId: number;
  selected: string;
  letter = new LetterVerify();
  affiliationCollegeList = [];
  letterReceiverList = [];
  letterReceiver: LetterReceiver;
  affiliationCollege: AffiliationCollege;
  licenceImage: any;
  billImageList: File | null;
  enableZoom: Boolean = true;
  loading = false;
  previewImageSrc: any;
  zoomImageSrc: any;
  mode = 'verify';

  constructor(
    private letterService: RegisterService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildVerifyForm();
    this.fetchParamFromUrl();
    this.fetchLetterDetails();
    this.disableVerifyDob();
  }

  fetchParamFromUrl() {
    this.spinner.show();

    this.route.queryParamMap
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((params) => {
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
    this.spinner.show();
    var id: number = this.letterId;
    // this.letterDetails$ = this.letterService.getLetterDetails(id);
    // console.log(JSON.stringify(this.letterDetails$));
    this.letterService
      .getLetterDetails(id)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((data) => {
        this.letter = data;
        console.log(data);
        this.letterReceiver = data.letterReceiver;
        this.affiliationCollege = data.affiliationCollege;
        this.licenceImage = data.photoLicence;
        this.billImageList = data.requestList;
        /* this.letterVerifyForm.patchValue({
        letterReceiver: this.letterReceiver.name,
      }); */

        this.buildVerifyForm();
      });
  }

  buildVerifyForm() {
    this.letterVerifyForm = this.formBuilder.group({
      regNo: [this.letter.regNo],
      name: [this.letter.name],
      address: [this.letter.address],
      wardNo: [this.letter.wardNo],
      collegeName: [this.letter.collegeName],
      collegeAddress: [this.letter.collegeAddress],
      dob: [this.letter.dob],
      email: [this.letter.email],
      mobileNo: [this.letter.mobileNo],
      photoLicenceChange: [this.letter.photoLicenceChange],
      photoLicence: [this.letter.photoLicence],
      photoBill: [this.letter.photoBill],
      photoBillChange: [this.letter.photoBillChange],
      letterReceiver: [this.letter.letterReceiver],
      affiliationCollege: [this.letter.affiliationCollege],
    });
  }

  onVerify() {
    this.loading = true;
    const id = this.letterId;
    this.letterService.isVerfied(id).subscribe(
      (res) => {
        this.loading = false;
        this.router.navigate(['/home/register/letter-list']);
      },
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error('Verification failed');
        this.loading = false;
      }
    );
  }
  onReject() {
    console.log('reject clicked');
    this.loading = true;

    const id = this.letterId;
    this.letterService.isRejected(id).subscribe(
      (res) => {
        this.loading = false;
        this.router.navigate(['/home/register/letter-list']);
      },
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error('Rejection failed');
        this.loading = false;
      }
    );
  }
  /* comparing the dropdown values & setting the selected value in edit form */
  compareFn(optionOne, optionTwo): boolean {
    return optionOne.id === optionTwo.id;
  }
  disableVerifyDob() {
    this.letterVerifyForm.get('dob').disable();
  }
}
