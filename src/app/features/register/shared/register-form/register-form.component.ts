import { LetterReceicer } from './../../../../core/models/letter-receicer.model';
import { AffiliationCollege } from './../../../../core/models/affiliation-college.model';
import { Letter } from '../../../../core/models/letter.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SearchFieldDataSource, SearchFieldResult } from 'ngx-mat-search-field';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  // props
  registerForm: FormGroup;
  letter = new Letter();
  register: Letter;
  licenceImageSrc: string = '';
  billImageSrc1: string = '';
  billImageSrc2: string = '';
  licenceImage: File | null;
  billImage1: File | null;
  billImage2: File | null;

  affiliationCollegeList: any[] = [];
  letterReceiverList: any[] = [];

  letterFormValues: Letter;
  letterFormValues$: Observable<Letter>;
  mode = 'add';

  letterStatus = 'V' || 'P' || 'R';
  letterId: number;
  letterDetails$: Observable<Letter>;
  letterReceiver: LetterReceicer;
  affCollege: AffiliationCollege;
  searchFieldDataSource: SearchFieldDataSource;

  isSubmitted = false;
  selected: string;
  dob: string;

  /*  replace with letterRecieved2 + bill name from server */
  selectedLicence = 'Choose File';
  selectedBill1 = 'Choose File';
  selectedBill2 = 'Choose File';

  constructor(
    // private http: HttpClient,
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.letterStatus = 'V';
    this.disablePhotoUpload();
    this.licenceImageSrc;
    this.billImageSrc1;
    this.buildRegisterForm();
    this.fetchLetterFormValues();
  }

  fetchLetterFormValues() {
    this.letterFormValues$ = this.registerService.getLetterForm().subscribe(
      (data) => {
        console.log(data);

        this.letterFormValues = data;
        this.affiliationCollegeList = data.affiliationCollegeList;
        this.letterReceiverList = data.letterReceiverList;
      },
      (err) => {
        err = err.message
          ? this.toastr.error(err.message)
          : this.toastr.error('Error fetching form values.');
      }
    );
  }

  onSearch(regId: number) {
    this.registerService.getSearchDetails(regId).subscribe((data) => {
      console.log(data);
      if (data.form.id !== 0) {
        this.mode = 'edit';
        this.letter = data.form;
        this.letterReceiver = data.form.letterReceiver;
        this.affCollege = this.letter.affiliationCollege;
        this.dob = this.letter.dob;
        this.licenceImage = data.form.photoLicence;
        this.selectedBill1 = data.form.letterReceiverName1;
        this.selectedBill2 = data.form.letterReceiverName2;
        this.billImage1 = data.form.photoBill1;
        this.billImage2 = data.form.photoBill2;
        // this.registerForm.get('dob').setValue(data.form.dob);

        this.buildRegisterForm();
        // this.resetRegisterForm();
      } else {
        this.toastr.error('You are not Registered.');
      }
    });
  }

  buildRegisterForm() {
    if (this.mode === 'add') {
      this.registerForm = this.formBuilder.group({
        regNo: [this.letter.regNo],
        name: [this.letter.name, Validators.required],
        address: [this.letter.address, Validators.required],
        wardNo: [this.letter.wardNo, Validators.required],
        collegeName: [this.letter.collegeName, Validators.required],
        collegeAddress: [this.letter.collegeAddress, Validators.required],
        dob: [this.letter.dob, Validators.required],
        email: [this.letter.email, Validators.required],
        mobileNo: [this.letter.mobileNo, Validators.required],
        photoLicenceChange: [true],
        photoLicence: [this.letter.photoLicence, Validators.required],
        photoBill1: [this.letter.photoBill1, Validators.required],
        photoBill2: [],
        photoBillChange1: [true],
        photoBillChange2: [],
        letterReceiver: [this.letter.letterReceiver, Validators.required],
        affiliationCollege: [
          this.letter.affiliationCollege,
          Validators.required,
        ],
      });
    } else {
      console.log('inside edit form');

      this.registerForm = this.formBuilder.group({
        regNo: [this.letter.regNo],
        name: [this.letter.name, Validators.required],
        address: [this.letter.address, Validators.required],
        wardNo: [this.letter.wardNo, Validators.required],
        collegeName: [this.letter.collegeName, Validators.required],
        collegeAddress: [this.letter.collegeAddress, Validators.required],
        dob: [this.letter.dob, Validators.required],
        email: [this.letter.email, Validators.required],
        mobileNo: [this.letter.mobileNo, Validators.required],
        photoLicence: [this.letter.photoLicence, Validators.required],
        photoLicenceChange: [
          this.letter.photoLicenceChange,
          Validators.required,
        ],
        photoBill1: [this.letter.photoBill1, Validators.required],
        photoBill2: [this.letter.photoBill2, Validators.required],
        photoBillChange1: [this.letter.photoBillChange1], //status V P R check garne ani matra flag on garne
        photoBillChange2: [this.letter.photoBillChange2],
        letterReceiver: [this.letter.letterReceiver, Validators.required],
        affiliationCollege: [
          this.letter.affiliationCollege,
          Validators.required,
        ],
      });
    }
  }

  patchPhotoLicenceChange() {
    // this.registerForm.patchValue({ photoLicenceChange: false });
    this.registerForm.controls['photoBillChaphotoLicenceChangenge1'].setValue(
      false
    );
  }
  patchPhotoBillChange1() {
    this.registerForm.controls['photoBillChange1'].setValue(false);
  }
  patchPhotoBillChange2() {
    this.registerForm.controls['photoBillChange2'].setValue(false);
  }
  patchLicencePhoto() {
    this.registerForm.controls['photoLicence'].setValue(this.licenceImageSrc);
  }
  patchBillPhoto1() {
    this.registerForm.controls['photoBill1'].setValue(this.billImageSrc1);
  }
  patchBillPhoto2() {
    this.registerForm.controls['photoBill2'].setValue(this.billImageSrc2);
  }

  get f() {
    return this.registerForm.controls;
  }
  onLicenceImageChange(event) {
    console.log(event);
    /* selected file info */
    if (event.target.files && event.target.files[0]) {
      this.selectedLicence = '';
      Array.from(event.target.files).forEach((file: File) => {
        this.selectedLicence += file.name + ' - ';
      });
      /* base64 conversion */
      const reader = new FileReader();
      if (event.target.files[0] && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.licenceImageSrc = null;
          this.licenceImageSrc = reader.result as string;
          console.log('photo licence ' + JSON.stringify(this.licenceImageSrc));
          this.patchLicencePhoto();
          this.patchPhotoLicenceChange();
        };
      }
    }
  }

  onBillImageChange1(event) {
    /* selected file info */
    if (event.target.files && event.target.files[0]) {
      this.selectedBill1 = '';
      Array.from(event.target.files).forEach((file: File) => {
        this.selectedBill1 += file.name + ' - ';
      });

      /* base64 conversion */
      const reader = new FileReader();
      if (event.target.files[0] && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.billImageSrc1 = null;
          this.billImageSrc1 = reader.result as string;
          console.log('photo bill1 ' + JSON.stringify(this.billImageSrc1));
          this.patchBillPhoto1();

          /* this.registerForm.patchValue({
          photoBill: reader.result,
          // console.log('licence ko base 64 ');
        }); */
          this.patchPhotoBillChange1();
        };
      }
    }
  }
  onBillImageChange2(event) {
    console.log(event);
    /* selected file info */
    if (event.target.files && event.target.files[0]) {
      this.selectedBill2 = '';
      Array.from(event.target.files).forEach((file: File) => {
        this.selectedBill2 += file.name + ' - ';
      });

      /* base64 conversion */
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
  }

  onRegister() {
    console.log(this.registerForm.value);
    this.isSubmitted = true;
    if (this.registerForm) {
       if (this.mode ) {
        this.registerService.register(this.registerForm.value).subscribe(
          (data) => {
            data = data.message
              ? this.toastr.success(data.message)
              : this.toastr.success('Student Details saved successfully.');
            // location.reload();
            this.resetRegisterForm();
          },
          (err) => {
            err = err.error.message
              ? this.toastr.error(err.error.message)
              : this.toastr.error('Error while saving letter.');
          }
        );
      } else {
        // for edit case
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
    this.resetRegisterForm();
  }

  disablePhotoUpload() {
    if (this.mode === 'edit' && this.letterStatus === 'V') {
      console.log('photo2 upload disabled');

      this.registerForm.get('photoBill1').disable();
    } else {
    }
  }
}
