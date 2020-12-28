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

  registerForm: FormGroup;
  letter = new Letter();
  letterFormValues$: Observable<Letter>;
  letterDetails$: Observable<Letter>;
  // letterReciverId: any;

  addOtherFields = false;
  showOldBills = false;
  isSubmitted = false;
  loading = false;
  addOptionalPhoto = false;
  isChecked = true;

  postalOtherId = 1;
  affiliatedOtherId: number = 1;
  formId: number;
  selectedLetterReceiverId: number;

  mode = 'add';
  isLastBillEdited = 'Add new bill';
  letterStatus = 'V' || 'P' || 'R';

  dob: string;
  fileName: string;
  expDate: string;
  issueDate: string;
  button1Status: string;
  button2Status: string;
  selectedLetterReceiver: string;
  selectedCollegeAff: string;
  toggle = 'Show old bills';

  licenceImage: File | null;
  billImage: File | null;
  altImage?: File | null;

  affiliationCollegeList: any[] = [];
  postalAddressList: any[] = [];
  letterReceiverList: any[] = [];
  addressList = [];
  oldBills: any = [];

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.buildRegisterForm();
    this.fetchLetterFormValues();
  }

  fetchLetterFormValues() {
    this.letterFormValues$ = this.registerService.getLetterForm().subscribe(
      (data) => {
        console.log('default form valuuuuse ' + data);

        this.letter = data.form;
        this.formId = data.form.id;
        this.affiliationCollegeList = data.affiliationCollegeList;
        this.letterReceiverList = data.letterReceiverList;
        this.postalAddressList = data.postalAddressList; // for drop-down display
        this.addressList = data.postalAddressList; // for changing drop-down values display

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
    this.spinner.show();
    this.registerService
      .getSearchDetails(regId)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (data) => {
          if (data.form.id !== 0) {
            this.mode = 'edit';
            this.letter = data.form;
            this.formId = data.form.id; // enabling checkbox
            this.affiliatedOtherId = data.form.affiliatedOtherId; // enabling checkbox
            this.licenceImage = data.form.photoLicence;
            this.billImage = data.form.photoBill;
            this.oldBills = data.form.requestList;
            // this.button1Status = this.letter.status;

            // this.disablePhotoUpload();
            this.buildRegisterForm();
          } else {
            // this.toastr.error('You are not Registered.');
          }
        },
        (err) => {
          err = err.error.message
            ? this.toastr.error(err.error.message)
            : this.toastr.error('Record no found');
        }
      );

    // this.letter = data.form;
    // this.letterReceiverList = this.letter.postalAddress;
    // this.disablePhotoUpload();
    // this.selectPostalAddress(this.letter.letterReceiver.id);
    this.buildRegisterForm();
  }

  buildRegisterForm() {
    if (this.mode == 'add') {
      this.registerForm = this.formBuilder.group({
        regNo: [this.letter.regNo], //EDIT SAVED WITH REGNO
        issueDate: [this.letter.issueDate],
        expDate: [this.letter.expDate],
        name: [this.letter.name],
        address: [this.letter.address],
        wardNo: [this.letter.wardNo],
        university: [this.letter.university],
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
    } else {
      this.registerForm = this.formBuilder.group({
        id: [this.letter.id],
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
        photoLicence: [this.letter.photoLicence],
        photoLicenceChange: [this.letter.photoLicenceChange],
        photoBill: [this.letter.photoBill],
        photoOption: [this.letter.photoOption],
        photoOptionChange: [this.letter.photoOptionChange],
        addNewBill: [this.letter.addNewBill],
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
    this.loading = true;

    this.isSubmitted = true;
    if (this.registerForm.valid) {
      if (this.mode) {
        if (this.selectedLetterReceiverId === 1) {
          this.registerForm.controls['postalAddress'].reset();
          this.registerService.register(this.registerForm.value).subscribe(
            (data) => {
              this.loading = false;
              data = data.message
                ? this.toastr.success(data.message)
                : this.toastr.success('Student saved successfully');
              location.reload();
            },
            (err) => {
              err = err.error.message
                ? this.toastr.error(err.error.message)
                : this.toastr.error('Error while saving letter.');
              this.loading = false;
            }
          );
        } else {
          this.registerForm.controls['address1'].reset();
          this.registerForm.controls['address2'].reset();
          this.registerForm.controls['address3'].reset();

          this.registerService.register(this.registerForm.value).subscribe(
            (data) => {
              this.loading = false;
              data = data.message
                ? this.toastr.success(data.message)
                : this.toastr.success('Student saved successfully');
              location.reload();
            },
            (err) => {
              err = err.error.message
                ? this.toastr.error(err.error.message)
                : this.toastr.error('Error while saving letter.');
              this.loading = false;
            }
          );
        }
      }
      /*   else {
        // selected letterReceiver Other ho vane postalAddress formControl lai reset garne
        // if id=3 vayo vane reset garne
        console.log('inside edit letterRecId ' + this.selectedLetterReceiverId);
        if (this.selectedLetterReceiverId === 1) {
          // reset previous postalAddress formControl Value and save the form
          this.registerForm.controls['postalAddress'].reset();

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

        } else {
          console.log('outside other edit ');
          this.registerForm.controls['address1'].reset();
          this.registerForm.controls['address2'].reset();
          this.registerForm.controls['address3'].reset();
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
        }
      } */
    } else {
      console.log('invalid register form');
    }
  }
  resetRegisterForm() {
    this.registerForm.reset();
  }

  hasError(name: string, required: string) {}

  onCancel() {
    // this.resetRegisterForm();
    location.reload();
  }

  // disablePhotoUpload() {
  //   this.mode === 'edit' && this.button1Status == 'V'
  //     ? this.registerForm.get('photoBill').disable()
  //     : this.registerForm.get('photoBill').enable();
  // }
  /* img to base64 conversion */
  onImageChange($event, imageType) {
    console.log('image type ' + imageType);
    const file = $event.target.files[0];
    this.convertToBase64(file, imageType);
  }

  convertToBase64(file: File, imageType: string) {
    console.log('image type ' + imageType);

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

  selectPostalAddress(id: number) {
    this.selectedLetterReceiverId = id;
    if (id === this.postalOtherId) {
      this.addOtherFields = true;
      this.addOptionalPhoto = false;
      this.postalAddressList = [];
      return;
    } else if (id === 2) {
      this.addOptionalPhoto = true;
      this.addOtherFields = false;
      this.postalAddressList = this.addressList.filter(
        (f) => f.letterReceiverId === id
      );
    } else {
      this.addOptionalPhoto = false;
      this.addOtherFields = false;
      this.postalAddressList = this.addressList.filter(
        (f) => f.letterReceiverId === id
      );
    }
  }

  seletAffiliationCollege(id: number) {
    console.log(id);

    this.affiliatedOtherId = id;
  }

  lastBillEdited(checked) {
    this.isLastBillEdited = checked ? 'Add New Bill' : ' Edit Bill';
  }

  toggleGallary(e) {
    this.showOldBills = !this.showOldBills;
    this.toggle =
      this.showOldBills !== true ? 'Show old bills' : 'Hide old bills';
  }
}
