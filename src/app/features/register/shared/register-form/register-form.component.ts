import { LetterVerifcationStatus } from './../../../../core/constants/letter-verifcation-status.enum';
import { LetterReceiver } from './../../../../core/models/letter-receiver.model';
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

  addOtherFields = false;
  showOldBills = false;
  isSubmitted = false;
  loading = false;
  addOptionalPhoto = false;
  isChecked = true;
  addNewBillStatus: boolean;
  hidePostalAddress: boolean;
  addUniversity = false;
  letterReceiverOption: boolean;

  postalOtherId = 1;
  affiliatedOtherId: number = 1;
  letterReceiverId: number;
  formId: number;
  affiliationCollegeId: number;
  selectedLetterReceiverId: number;

  dob: string;
  fileName: string;
  expDate: string;
  issueDate: string;
  button1Status: string;
  button2Status: string;
  selectedLetterReceiver: string;
  selectedCollegeAff: string;
  optionalPhoto: string;
  toggle = 'Show old bills';
  mode = 'add';
  isLastBillEdited = 'Add new bill';
  letterStatus = 'V' || 'P' || 'R';

  licenceImage: File | null;
  billImage: File | null;
  altImage?: File | null | string;

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
        this.letter = data.form;
        this.formId = data.form.id;
        this.affiliationCollegeList = data.affiliationCollegeList;
        this.letterReceiverList = data.letterReceiverList;
        this.altImage = this.letter.photoOption;
        this.postalAddressList = data.postalAddressList; // for drop-down display
        this.addressList = data.postalAddressList; // for changing drop-down values display
        this.addNewBillStatus = this.letter.addNewBill; // for changing drop-down values display

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
            this.altImage = data.form.photoOption;
            this.oldBills = data.form.requestList;
            this.addNewBillStatus = data.form.addNewBill;
            this.letterReceiverId = this.letter.letterReceiver.id;
            this.affiliationCollegeId = this.letter.affiliationCollege.id; // university field display ko lagi
            // this.letterReceiverOptionStatus = this.letter.photoOption;
            this.hideLetterReceiver();
            this.buildRegisterForm();
          }
        },
        (err) => {
          err = err.error.message
            ? this.toastr.error(err.error.message)
            : this.toastr.error('Record no found');
        }
      );
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
        university: [this.letter.university],
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
        /* postalAddress 'other' selected*/
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
        this.registerForm.controls['photoOption'].setValue(this.altImage);
        this.registerForm.controls['photoOptionChange'].setValue(true);
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
  compareFn(optionOne: any, optionTwo: any): boolean {
    return optionOne.id === optionTwo.id;
  }

  selectPostalAddress(opt: LetterReceiver) {
    console.log(opt);

    this.letterReceiverOption = opt.option; //for photoOption
    this.selectedLetterReceiverId = opt.id; // for postalAddress fields
    /* for 'other' selection */
    if (this.selectedLetterReceiverId === 1) {
      this.selectedLetterReceiverId = 1;
      this.addOtherFields = true;
      this.letterReceiverOption = this.letterReceiverOption;
      this.postalAddressList = [];
      return;
    } else {
      /* for not 'other' selection */
      // this.letterReceiverOption = this.letterReceiverOption;
      this.letterReceiverId = opt.id;
      this.addOtherFields = false; // hide address1,2,3 fields
      /* show drop down list on postalAddress */
      this.postalAddressList = this.addressList.filter(
        (f) => f.letterReceiverId === opt.id
      );
      /* for altImage  */
      if (this.letterReceiverOption === true) {
        this.letterReceiverOption = this.letterReceiverOption;
      } else {
        console.log('inside else ');
        this.resetPhotoOption(); // reset photoOption control if
      }
    }
  }

  resetPhotoOption() {
    console.log('inside photoOption reset');
    this.registerForm.controls['photoOption'].reset();
  }

  seletAffiliationCollege(id: number) {
    if (this.mode !== 'edit') {
      id === 1 ? (this.addUniversity = true) : (this.addUniversity = false);
    } else {
      this.affiliationCollegeId = id; // univeristy field display ko lagi
      this.registerForm.controls['university'].reset();
    }
  }

  lastBillEdited(checked) {
    this.isLastBillEdited = checked ? 'Add New Bill' : ' Edit Bill';
  }

  toggleGallary(e) {
    this.showOldBills = !this.showOldBills;
    this.toggle =
      this.showOldBills !== true ? 'Show old bills' : 'Hide old bills';
  }

  hideLetterReceiver() {
    console.log('calling hide leteer function' + this.letterReceiverId);

    if (this.letterReceiverId === 1) {
      this.selectedLetterReceiverId = this.letterReceiverId;
    } else {
      this.selectedLetterReceiverId = this.letterReceiverId;
    }
    /*  this.letterReceiverId === 1
      ? (this.selectedLetterReceiverId = this.letterReceiverId)
      : (this.selectedLetterReceiverId = this.letterReceiverId); */
  }
}
