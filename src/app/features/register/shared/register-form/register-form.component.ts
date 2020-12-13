import { Letter } from '../../../../core/models/letter.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { ImageService } from '../../services/image.service';
import { ToastrService } from 'ngx-toastr';

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
  billImage: File | null;

  affiliationCollegeList: any[] = [];
  letterReceiverList: any[] = [];

  fileAttr = 'Choose Licence Image';
  fileAttrBill = 'Choose Bill Image';
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInputBill') fileInputBill: ElementRef;

  letterFormValues: Letter;
  constructor(
    // private http: HttpClient,
    private registerService: RegisterService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.licenceImage = null;
    this.billImage = null;
  }

  ngOnInit() {
    this.licenceImageSrc;
    this.billImageSrc;
    // this.toastrService.success('wel-come to create new customer page')
    this.buildRegisterForm();
    this.fetchLetterFormValues();
  }

  fetchLetterFormValues() {
    this.registerService.getLetterForm().subscribe(
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

  buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      regNo: [this.letter.regNo],
      name: [this.letter.name, Validators.required],
      address: [this.letter.address, Validators.required],
      wardNo: [this.letter.wardNo, Validators.required],
      // program: [this.letter.program, Validators.required],
      collegeName: ['', Validators.required],
      collegeAddress: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      mobileNo: ['', Validators.required],
      photoLicence: ['', Validators.required],
      photoBill: ['', Validators.required],
      letterReceiver: ['', Validators.required],
      affiliationCollege: ['', Validators.required],
      /* letterReceiver: this.formBuilder.group({
        id: [],
        name: ['', Validators.required],
      }), */
      /* affiliationCollege: this.formBuilder.group({
        id: [],
        name: ['', Validators.required],
      }) */
    });
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
      // console.log(reader.readAsDataURL(file));

      reader.onload = () => {
        this.licenceImageSrc = reader.result as string;

        this.registerForm.patchValue({
          photoLicence: reader.result,
        });
      };
    }
  }
  onBillImageChange(event) {
    console.log(event);

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      // console.log(reader.readAsDataURL(file));

      reader.onload = () => {
        this.billImageSrc = reader.result as string;

        this.registerForm.patchValue({
          photoBill: reader.result,
        });
      };
    }
  }

  onRegister() {
    console.log('dfasdf' + JSON.stringify(this.registerForm.value));
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

    this.registerService.register(this.registerForm.value).subscribe(
      (data) => {
        console.log('subscribe vitra daddfa' + data);
        // this.customer = data;
        this.router.navigate(['home/register']);
        // this.registerForm = data;?console.log('dafsdfsa' + this.registerForm);
        // tslint:disable-next-line:no-shadowed-variable
      },
      (err) => {
        err = err.message
          ? this.toastr.error(err.message)
          : this.toastr.error('Error while saving letter.');
      }
    );
  }

  hasError(name: string, required: string) {}

  public onCancel = () => {
    return null;
    // this.location.reload();
  };
}
