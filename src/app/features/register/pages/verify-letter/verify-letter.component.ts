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
  letterFormValues$: Observable<Letter>;

  letterDetails: LetterVerify;
  letterId: number;
  postalAddressId: number;
  selected: string;
  letter = new Letter();
  affiliationCollegeList = [];
  postalAddressList = [];
  letterReceiverList = [];
  addressList = [];
  letterReceiver: LetterReceiver;
  affiliationCollege: AffiliationCollege;
  licenceImage: any;
  billImageList: File | null;
  billImage: File | null;
  altImage: any;
  enableZoom: Boolean = true;
  addOptionalPhoto: Boolean = true;
  loading = false;
  showOldBills = false;
  lastBillStatus

  previewImageSrc: any;
  zoomImageSrc: any;
  mode = 'verify';
  expDate: string;
  issueDate: string;
  dob: string;

  constructor(
    private letterService: RegisterService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchLetterFormValues();
    this.buildVerifyForm();
    this.fetchParamFromUrl();
    this.disableVerifyDob();
  }
  fetchLetterFormValues() {
    this.letterFormValues$ = this.letterService.getLetterForm().subscribe(
      (data) => {
        console.log('default form valuuuuse ' + data);
        this.letter = data.form;
        this.affiliationCollegeList = data.affiliationCollegeList;
        this.letterReceiverList = data.letterReceiverList;
        this.postalAddressList = data.postalAddressList; // for drop-down display
        this.addressList = data.postalAddressList; // for changing drop-down values display
        // this.buildRegisterForm();
      },
      (err) => {
        err = err.message
          ? this.toastr.error(err.message)
          : this.toastr.error('Error fetching form values.');
      }
    );
  }

  fetchParamFromUrl() {
    this.spinner.show();

    this.route.queryParamMap
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((params) => {
        this.letterId = +params.get('id');
        console.log(this.letterId);
        /* test */
        this.letterService
          .getLetterDetails(this.letterId)
          .pipe(finalize(() => this.spinner.hide()))
          .subscribe(
            (data) => {
              this.letter = data;
              console.log(data);
              this.licenceImage = data.photoLicence;

              this.altImage = data.photoOption;
              this.billImage = data.photoBill;
              this.billImageList = data.requestList;
              this.lastBillStatus = data.lastBillEdit;
              this.postalAddressId = data.postalAddress.letterReceiverId;
              this.buildVerifyForm();
            },
            (err) => {
              err.error.message = err.error.message
                ? this.toastr.error(err.error.message)
                : this.toastr.error('Error in fetching data.');
            }
          );
        /* test end */
      }),
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error('Error fetching param value.');
      };
  }

  buildVerifyForm() {
    this.letterVerifyForm = this.formBuilder.group({
      regNo: [this.letter.regNo],
      issueDate: [this.letter.issueDate],
      expDate: [this.letter.expDate],
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
      photoOption: [this.letter.photoOption],
      photoOptionChange: [this.letter.photoOptionChange],
      addNewBill: [this.letter.addNewBill],
      address1: [this.letter.address1],
      address2: [this.letter.address2],
      address3: [this.letter.address3],
      letterReceiver: [this.letter.letterReceiver],
      postalAddress: [this.letter.postalAddress],
      affiliationCollege: [this.letter.affiliationCollege],
    });
  }

  onVerify() {
    console.log(this.letterVerifyForm.value);

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
    this.letterVerifyForm.get('letterReceiver').disable();
    this.letterVerifyForm.get('postalAddress').disable();

    // this.letterVerifyForm.get('addNewBill').disable();
    // this.letterVerifyForm.disable();
  }
}
