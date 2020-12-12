import { Register } from './../../../../core/models/register.model';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { ImageSnippet } from 'src/app/core/models/image-snippet.model';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  public registerForm: FormGroup;
  register: Register;
  licenceImageSrc: string = '';
  billImageSrc: string = '';

  licenceImage: File | null;
  billImage: File | null;

  affiliations: any[] = ['C.T.E.V.T', 'T.U', 'P.U', 'K.U'];

  fileAttr = 'Choose Licence Image';
  fileAttrBill = 'Choose Bill Image';
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInputBill') fileInputBill: ElementRef;

  constructor(
    // private http: HttpClient,
    private registerService: RegisterService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private router: Router // private toastrService: ToastrService
  ) {
    this.licenceImage = null;
    this.billImage = null;
  }

  ngOnInit() {
    this.licenceImageSrc;
    this.billImageSrc;
    // this.toastrService.success('wel-come to create new customer page')
    this.buildRegisterForm();
  }

  buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      regNum: ['', Validators.required],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      wardNum: ['', Validators.required],
      program: ['', Validators.required],
      aff: ['', Validators.required],
      college: ['', Validators.required],
      dob: ['', Validators.required],
      // regDate: ['', Validators.required],
      // file: [null],
      photoLicence: ['', Validators.required],
      photoBill: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  /* test */
  onLicenceImageChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.licenceImageSrc = reader.result as string;

        this.registerForm.patchValue({
          photoLicence: reader.result,
        });
      };
    }
  }
  onBillImageChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.billImageSrc = reader.result as string;

        this.registerForm.patchValue({
          photoBill: reader.result,
        });
      };
    }
  }
  /* / test */

  /* test2 */
  /* uploadFileEvt(imgFile: any) {
    console.log(imgFile);

    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  } */
  /* / test2 */

  /*  onLicenceImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var licence = new FileReader();

        licence.onload = (event: any) => {
          console.log(event.target.result);

          this.licenceList.push(event.target.result);

          this.registerForm.patchValue({
            licence: licence,
          });
        };

        licence.readAsDataURL(event.target.files[i]);
      }
    }
  } */

  /*  onBillImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var bill = new FileReader();

        bill.onload = (event: any) => {
          console.log(event.target.result);

          this.billList.push(event.target.result);

          this.registerForm.patchValue({
            bill: this.billList,
          });
        };

        bill.readAsDataURL(event.target.files[i]);
      }
    }
  } */
  onRegister() {
    console.log('dfasdf' + JSON.stringify(this.registerForm.value));

    this.registerService.register(this.registerForm.value).subscribe(
      (data) => {
        console.log('subscribe vitra daddfa' + data);
        // this.customer = data;
        this.router.navigate(['home/register-list']);
        // this.registerForm = data;?console.log('dafsdfsa' + this.registerForm);
        // tslint:disable-next-line:no-shadowed-variable
      },
      (error) => {
        console.log(' error vitra xu' + JSON.stringify(error));
      }
    );
  }

  hasError(name: string, required: string) {}

  public onCancel = () => {
    return null;
    // this.location.reload();
  };
}
