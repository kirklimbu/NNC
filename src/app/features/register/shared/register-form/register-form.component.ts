import { Register } from './../../../../core/models/register.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  selected = 'option2';
  selectedFile: ImageSnippet;
  images = [];
  affiliation: any[] = ['T.U', 'P.U', 'K.U'];
  constructor(
    // private http: HttpClient,
    private registerService: RegisterService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private router: Router // private toastrService: ToastrService
  ) {}

  ngOnInit() {
    // this.toastrService.success('wel-come to create new customer page')

    this.registerForm = this.formBuilder.group({
      regNum: ['', Validators.required],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      wardNum: ['', Validators.required],
      program: ['', Validators.required],
      affiliate: ['', Validators.required],
      college: ['', Validators.required],
      dob: ['', Validators.required],
      // regDate: ['', Validators.required],
      file: [Validators.required],
      fileSource: [Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);

          this.images.push(event.target.result);

          this.registerForm.patchValue({
            fileSource: this.images,
          });
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onRegister() {
    console.log('dfasdf' + JSON.stringify(this.registerForm.value));

    this.registerService.register(this.registerForm.value);
    /* .subscribe(
      (data) => {
        console.log('subscribe vitra daddfa' + data);
        // this.customer = data;
        this.router.navigate(['/customerlist']);
        // this.registerForm = data;?console.log('dafsdfsa' + this.registerForm);
        // tslint:disable-next-line:no-shadowed-variable
      },
      (error) => {
        console.log(' error vitra xu' + error);
      }
    ); */
  }

  hasError(name: string, required: string) {}

  public onCancel = () => {
    return null;
    // this.location.reload();
  };
}
