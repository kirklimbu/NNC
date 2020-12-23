import { LetterReceicer } from './../../../../core/models/letter-receicer.model';
import { Letter } from '../../../../core/models/letter.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  // props
  mode = 'add';
  registerForm: FormGroup;
  letter = new Letter();

  licenceImage: File | null;
  billImage: File | null;
  // billImage2: File | null;
  altImage?: File | null;

  affiliationCollegeList: any[] = [];
  postalAddressList: any[] = [];
  letterReceiverList: any[] = [];

  letterFormValues$: Observable<Letter>;

  letterStatus = 'V' || 'P' || 'R';

  letterDetails$: Observable<Letter>;

  isSubmitted = false;
  selectedLetterReceiver: string;
  selectedCollegeAff: string;
  dob: string;
  expDate: string;
  issueDate: string;

  button1Status: string;
  button2Status: string;

  selectedCollegeList = [];

  addOptionalPhoto = false;
  fileName: string;
  otherId = 1;
  letterReciverId: any;
  addOtherFields = false;
  showOldBills = false;
  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // this.spinner.show();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    this.buildRegisterForm();
    this.fetchLetterFormValues();
  }

  fetchLetterFormValues() {
    this.letterFormValues$ = this.registerService.getLetterForm().subscribe(
      (data) => {
        this.letter = data.form;
        this.affiliationCollegeList = data.affiliationCollegeList;
        this.letterReceiverList = data.letterReceiverList;
        this.postalAddressList = data.postalAddressList;

        this.buildRegisterForm();
      },
      (err) => {
        err = err.message
          ? this.toastr.error(err.message)
          : this.toastr.error('Error fetching form values.');
      }
    );
  }

  onSearch(regId: number) {
    console.log('inside serarch');

    // this.spinner.show();
    /* this.registerForm.reset();
     this.mode = 'edit'; */
    this.registerService
      .getSearchDetails(regId)
      // .pipe(finalize(() => this.spinner.hide()))
      .subscribe((data) => {
        if (data.form.id !== 0) {
          this.mode = 'edit';

          this.letter = data.form;
          this.licenceImage = data.form.photoLicence;
          this.billImage = data.form.photoBill1;
          this.button1Status = this.letter.status1;

          this.letterReciverId = this.letter.letterReceiverId1;
          this.disablePhotoUpload();
          this.buildRegisterForm();
        } else {
          this.toastr.error('You are not Registered.');
        }
      });

    // this.letter = data.form;
    // this.letterReceiverList = this.letter.postalAddress;
    // this.disablePhotoUpload();
    this.selectPostalAddress(this.letter.letterReceiver.id);
    this.buildRegisterForm();

    /* fake response for edit form end */
  }

  buildRegisterForm() {
    if (this.mode == 'add') {
      this.registerForm = this.formBuilder.group({
        regNo: [this.letter.regNo],
        issueDate: [this.letter.issueDate],
        expDate: [this.letter.regNo],
        name: [this.letter.name],
        address: [this.letter.address],
        wardNo: [this.letter.wardNo],
        collegeName: [this.letter.collegeName],
        collegeAddress: [this.letter.collegeAddress],
        dob: [this.letter.dob],
        email: [this.letter.email],
        mobileNo: [this.letter.mobileNo],
        photoLicenceChange: [true],
        photoLicence: [this.letter.photoLicence],
        photoBill: [this.letter.photoBill],
        photoBillChange: [this.letter.photoBillChange],
        photoOption: [this.letter.photoOption],
        lastBillEdit: [this.letter.lastBillEdit],
        address1: [this.letter.address1],
        address2: [this.letter.address2],
        address3: [this.letter.address3],
        letterReceiver: [this.letter.letterReceiver],
        postalAddress: [this.letter.postalAddress],
        affiliationCollege: [this.letter.affiliationCollege],
      });
    } else {
      this.registerForm = this.formBuilder.group({
        id: [this.letter.id],
        regNo: [this.letter.regNo],
        issueDate: [this.letter.issueDate],
        expDate: [this.letter.regNo],
        name: [this.letter.name],
        address: [this.letter.address],
        wardNo: [this.letter.wardNo],
        collegeName: [this.letter.collegeName],
        collegeAddress: [this.letter.collegeAddress],
        dob: [this.letter.dob],
        email: [this.letter.email],
        mobileNo: [this.letter.mobileNo],
        photoLicence: [this.letter.photoLicence],
        photoLicenceChange: [this.letter.photoLicenceChange],
        photoBill: [this.letter.photoBill],
        photoOption: [this.letter.photoOption],
        lastBillEdit: [this.letter.lastBillEdit],
        address1: [this.letter.address1],
        address2: [this.letter.address2],
        address3: [this.letter.address3],
        photoBillChange: [this.letter.photoBillChange],
        letterReceiver: [this.letter.letterReceiver],
        postalAddress: [this.letter.postalAddress],
        affiliationCollege: [this.letter.affiliationCollege],
      });
    }
  }

  // for showing error message
  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    this.isSubmitted = true;
    if (this.registerForm) {
      this.registerService.register(this.registerForm.value).subscribe(
        (data) => {
          data = data.message
            ? this.toastr.success(data.message)
            : this.toastr.success('Student saved successfully');
          location.reload();
        },
        (err) => {
          err = err.error.message
            ? this.toastr.error(err.error.message)
            : this.toastr.error('Error while saving letter.');
        }
      );
    } /* else {
      console.log('invalid register form');
    } */
  }
  resetRegisterForm() {
    this.registerForm.reset();
  }

  hasError(name: string, required: string) {}

  onCancel() {
    // this.resetRegisterForm();
    location.reload();
  }

  disablePhotoUpload() {
    this.mode === 'edit' && this.button1Status == 'V'
      ? this.registerForm.get('photoBill1').disable()
      : this.registerForm.get('photoBill1').enable();
  }
  /* img to base64 conversion */
  onImageChange($event, imageType) {
    const file = $event.target.files[0];
    /* test  */
    this.fileName = file.name;
    if (this.fileName.length > 10) {
      this.fileName = this.fileName.substring(0, 10);
    }
    console.log(this.fileName);
    /* test end */

    this.convertToBase64(file, imageType);
  }

  convertToBase64(file: File, imageType: string) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((base64) => {
      if (imageType === 'photoLicence') {
        this.licenceImage = base64;
        this.registerForm.controls['photoLicence'].setValue(this.licenceImage);
        this.registerForm.controls['photoLicenceChange'].setValue(true);
      } else if (imageType === 'photoBill') {
        this.billImage = base64;
        this.registerForm.controls['photoBill'].setValue(this.billImage);
        this.registerForm.controls['photoBillChange'].setValue(true);
      } else if (imageType === 'altImage') {
        /*  else if (imageType === 'photoBill2') {
        this.billImage2 = base64;
        this.registerForm.controls['photoBill2'].setValue(this.billImage2);
        this.registerForm.controls['photoBillChange2'].setValue(true);
      }  */
        this.altImage = base64;
        this.registerForm.controls['photoAlt'].setValue(this.altImage);
        // this.registerForm.controls['altPhtoto'].setValue(true);
      }
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  /* comparing the dropdown values & setting the selected value in edit form */
  compareFn(optionOne, optionTwo): boolean {
    return optionOne.id === optionTwo.id;
  }

  selectPostalAddress(letterReceiver: number) {
    console.log(letterReceiver);

    if (letterReceiver === this.otherId) {
      this.addOtherFields = true;
      this.addOptionalPhoto = false;
      this.postalAddressList = [];
      return;
    } else if (letterReceiver === 2) {
      this.addOptionalPhoto = true;
      this.addOtherFields = false;
      console.log(this.addOptionalPhoto);
      this.postalAddressList = this.postalAddressList.filter(
        (f) => f.letterReceiverId === letterReceiver

      /* YAHA SAMASYA XA START FROM HERE TOMORROW */);
    } else {
      this.addOptionalPhoto = false;
      this.addOtherFields = false;
      this.postalAddressList = this.postalAddressList.filter(
        (f) => f.letterReceiverId === letterReceiver
      );
    }
  }
}
