import { LetterReceicer } from './../../../../core/models/letter-receicer.model';
import { AffiliationCollege } from './../../../../core/models/affiliation-college.model';
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

  licenceImage: File | null | string;
  billImage1: File | null;
  billImage2: File | null;

  affiliationCollegeList: any[] = [];
  letterReceiverList: any[] = [];

  letterFormValues$: Observable<Letter>;

  letterStatus = 'V' || 'P' || 'R';

  letterDetails$: Observable<Letter>;

  isSubmitted = false;
  selectedLetterReceiver: string;
  selectedCollegeAff: string;
  dob: string;

  selectedLicence = 'Licence';
  selectedBill1 = 'Bill 1';
  selectedBill2 = 'Bill 2';

  button1Status: string;
  button2Status: string;

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
          this.billImage1 = data.form.photoBill1;
          this.billImage2 = data.form.photoBill2;
          this.button1Status = this.letter.status1;
          this.button2Status = this.letter.status2;

          this.disablePhotoUpload();
          this.buildRegisterForm();
        } else {
          this.toastr.error('You are not Registered.');
        }
      });
  }

  buildRegisterForm() {
    if (this.mode == 'add') {
      this.registerForm = this.formBuilder.group({
        regNo: [this.letter.regNo],
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
        photoBill1: [this.letter.photoBill1],
        photoBill2: [],
        photoBillChange1: [this.letter.photoBillChange1],
        photoBillChange2: [this.letter.photoBillChange2],
        letterReceiver: [this.letter.letterReceiver],
        affiliationCollege: [this.letter.affiliationCollege],
        letterReceiverId1: [this.letter.letterReceiverId1],
        letterReceiverId2: [this.letter.letterReceiverId2],
        letterReceiverName1: [this.letter.letterReceiverName1],
        letterReceiverName2: [this.letter.letterReceiverName2],
      });
    } else {


      this.registerForm = this.formBuilder.group({
        id: [this.letter.id],
        regNo: [this.letter.regNo],
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
        photoBill1: [this.letter.photoBill1],
        photoBill2: [this.letter.photoBill2],
        letterReceiverId1: [this.letter.letterReceiverId1],
        letterReceiverId2: [this.letter.letterReceiverId2],
        letterReceiverName1: [this.letter.letterReceiverName1],
        letterReceiverName2: [this.letter.letterReceiverName2],
        photoBillChange1: [this.letter.photoBillChange1],
        photoBillChange2: [this.letter.photoBillChange2],
        letterReceiver: [this.letter.letterReceiver],
        affiliationCollege: [this.letter.affiliationCollege],
      });
    }
  }

  /* patchPhotoLicenceChange() {
    // this.registerForm.patchValue({ photoLicenceChange: false });
    this.registerForm.controls['photoLicenceChange'].setValue(true);
  } */
  /*  patchPhotoBillChange1() {
    this.registerForm.controls['photoBillChange1'].setValue(true);
  } */
  /* patchPhotoBillChange2() {
    this.registerForm.controls['photoBillChange2'].setValue(true);
  } */
  /*  patchLicencePhoto() {
    console.log('phtoto patch' + JSON.stringify(this.licenceImageSrc));

    this.registerForm.controls['photoLicence'].setValue(this.licenceImageSrc);
  } */
  /* patchBillPhoto1() {
    this.registerForm.controls['photoBill1'].setValue(this.billImageSrc1);
  } */
  /* patchBillPhoto2() {
    this.registerForm.controls['photoBill2'].setValue(this.billImageSrc2);
  } */

  // for showing error message
  get f() {
    return this.registerForm.controls;
  }

  /* onBillImageChange2(event) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      this.selectedBill2 = '';
      Array.from(event.target.files).forEach((file: File) => {
        this.selectedBill2 += file.name + ' - ';
      });
      const reader = new FileReader();
      if (event.target.files[0] && event.target.files.length) {
        const [file] = event.target.files;
       reader.readAsDataURL(file);
        reader.onload = () => {
          this.billImageSrc2 = null;
          this.billImageSrc2 = reader.result as string;
          console.log('photo bill ' + JSON.stringify(this.billImageSrc2));
          this.patchBillPhoto2();
          this.patchPhotoBillChange2();
        };
      }
    }
  } */

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
    this.resetRegisterForm();
  }

  disablePhotoUpload() {


    this.mode === 'edit' && this.button1Status == 'V'
      ? this.registerForm.get('photoBill1').disable()
      : this.registerForm.get('photoBill1').enable();

    /*  if (this.mode === 'edit' && this.button1Status == 'V') {
      console.log('inside if disable');

      this.registerForm.get('photoBill1').disable();
    } else {
      console.log('inside else disable');

      this.registerForm.get('photoBill1').enable();
    } */
  }
  /* img to base64 conversion */
  onImageChange($event, imageType) {
    const file = $event.target.files[0];
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
      } else if (imageType === 'photoBill1') {
        this.billImage1 = base64;
        this.registerForm.controls['photoBill1'].setValue(this.billImage1);
        this.registerForm.controls['photoBillChange1'].setValue(true);
      } else if (imageType === 'photoBill2') {
        this.billImage2 = base64;
        this.registerForm.controls['photoBill2'].setValue(this.billImage2);
        this.registerForm.controls['photoBillChange2'].setValue(true);
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
}
