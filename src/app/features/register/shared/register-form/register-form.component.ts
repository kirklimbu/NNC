import { LetterReceicer } from './../../../../core/models/letter-receicer.model';
import { AffiliationCollege } from './../../../../core/models/affiliation-college.model';
import { Letter } from '../../../../core/models/letter.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { ImageService } from '../../services/image.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SearchFieldDataSource, SearchFieldResult } from 'ngx-mat-search-field';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  public registerForm: FormGroup;
  letter = new Letter();
  register: Letter;
  licenceImageSrc: string = '';
  billImageSrc: string = '';
  licenceImage: File | null;
  // billImage: File[] | null;
  billImage: any[];

  affiliationCollegeList: any[] = [];
  letterReceiverList: any[] = [];

  fileAttr = 'Choose Licence Image';
  fileAttrBill = 'Choose Bill Image';
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInputBill') fileInputBill: ElementRef;

  letterFormValues: Letter;
  letterFormValues$: Observable<Letter>;
  mode = 'add';

  letterId: number;
  letterDetails$: Observable<Letter>;
  letterReceiver: LetterReceicer;
  affiliationCollege: AffiliationCollege;
  searchFieldDataSource: SearchFieldDataSource;

  isSubmitted = false;

  constructor(
    // private http: HttpClient,
    private registerService: RegisterService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService // private userService: UserService
  ) {
    this.licenceImage = null;
    this.billImage = null;
    this.searchFieldDataSource = {
      search(
        regNo: string
        /*  size: number,
        skip: number */
      ): Observable<SearchFieldResult> {
        return registerService.getSearchDetails(regNo).subscribe((data) => {
          console.log('constructor vitra ' + JSON.stringify(data));
        });
      },
    };
  }

  ngOnInit() {
    this.licenceImageSrc;
    this.billImageSrc;
    this.buildRegisterForm();
    this.fetchLetterFormValues();
    // this.fetchParamFromUrl();
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
      this.mode = 'edit';
      this.letter = data.form;
      this.letterReceiver = data.form.letterReceiver;
      this.affiliationCollege = data.form.affiliationCollege;
      this.licenceImage = data.form.photoLicence;
      this.billImage = data.form.requestList;
      console.log('photo request list : ' + JSON.stringify(this.billImage));

      this.buildRegisterForm();
    });
  }

  buildRegisterForm() {
    if (this.mode === 'add') {
      this.registerForm = this.formBuilder.group({
        regNo: [this.letter.regNo],
        name: [this.letter.name, Validators.required],
        address: [this.letter.address, Validators.required],
        wardNo: [this.letter.wardNo, Validators.required],
        // program: [this.letter.program, Validators.required],
        collegeName: [this.letter.collegeName, Validators.required],
        collegeAddress: [this.letter.collegeAddress, Validators.required],
        dob: [this.letter.dob, Validators.required],
        email: [this.letter.email, Validators.required],
        mobileNo: [this.letter.mobileNo, Validators.required],
        photoLicenceChange: [true],
        photoLicence: [this.letter.photoLicence, Validators.required],
        photoBill: [this.letter.photoBill, Validators.required],
        photoBillChange: [true],
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
        // program: [this.letter.program, Validators.required],
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
        photoBill: [this.letter.photoBill, Validators.required],
        photoBillChange: [this.letter.photoBillChange],
        letterReceiver: [this.letter.letterReceiver, Validators.required],
        affiliationCollege: [
          this.letter.affiliationCollege,
          Validators.required,
        ],
      });
    }
  }

  patchPhotoLicenceChange() {
    this.registerForm.patchValue({ photoLicenceChange: true });
  }
  patchPhotoBillChange() {
    this.registerForm.patchValue({ photoBillChange: true });
  }

  get f() {
    return this.registerForm.controls;
  }
  /* test */
  onLicenceImageChange(event) {
    console.log(event);

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.licenceImageSrc = reader.result as string;

        this.registerForm.patchValue({
          photoLicence: reader.result,
        });
        this.patchPhotoLicenceChange();
        // this.registerForm.patchValue({photoLicenceChange: true})

        /*  this.registerForm.patchValue({
          photoLicenceChange: 'true',
        });
        this.registerForm.controls['photoLicenceChange'].patchValue(true); */
      };
    }
  }

  onBillImageChange(event) {
    console.log(event);

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.billImageSrc = reader.result as string;

        this.registerForm.patchValue({
          photoBill: reader.result,
        });
        this.patchPhotoLicenceChange();
        // this.registerForm.get('photoBillChange').patchValue(true);
      };
    }
  }

  onRegister() {
    console.log(JSON.stringify(this.registerForm.value));
    /* const formData = new FormData();
    formData.append('regNum', this.registerForm.value.regNum);
    formData.append('fullName', this.registerForm.value.photofullNameBill);
    formData.append('address', this.registerForm.value.address);
    formData.append('wardNum', this.registerForm.value.wardNum);
    formData.append('program', this.registerForm.value.program);
    formData.append('aff', this.registerForm.value.aff);
    formData.append('college', this.registerForm.value.college);
    formData.append('photoLicence', this.licenceImage, this.licenceImage.name);
    formData.append('photoBill', this.billImage, this.billImage.name); */
    // formData.append('file', this.registerForm.get('photoBill').value);
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      if (this.mode === 'add') {
        this.registerService.register(this.registerForm.value).subscribe(
          (data) => {
            console.log('subscribe vitra daddfa' + data);
            // this.customer = data;
            this.router.navigate(['home/register']);
            // this.registerForm = data;?console.log('dafsdfsa' + this.registerForm);
            // tslint:disable-next-line:no-shadowed-variable
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

  hasError(name: string, required: string) {}

  public onCancel = () => {
    return null;
    // this.location.reload();
  };
}
