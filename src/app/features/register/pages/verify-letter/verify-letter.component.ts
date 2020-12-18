import { AffiliationCollege } from './../../../../core/models/affiliation-college.model';
import { LetterReceicer } from './../../../../core/models/letter-receicer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Letter } from 'src/app/core/models/letter.model';
import { LetterVerify } from 'src/app/core/models/verify-letter.model';

@Component({
  selector: 'app-verify-letter',
  templateUrl: './verify-letter.component.html',
  styleUrls: ['./verify-letter.component.scss'],
})
export class VerifyLetterComponent implements OnInit {
  // props
  letterVerifyForm: FormGroup;
  letterDetails$: Observable<Letter>;
  letterDetails: LetterVerify;
  letterId: number;
  selected: string;
  letter = new LetterVerify();
  affiliationCollegeList = [];
  letterReceiverList = [];
  letterReceiver: LetterReceicer;
  affiliationCollege: AffiliationCollege;
  licenceImage: any;
  billImage: any[];
  enableZoom: Boolean = true;
  previewImageSrc: any;
  zoomImageSrc: any;

  constructor(
    private letterService: RegisterService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchParamFromUrl();
    this.fetchLetterDetails();
  }

  fetchParamFromUrl() {
    this.route.queryParamMap.subscribe((params) => {
      this.letterId = +params.get('id');
      console.log(this.letterId);
    }),
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error('Error fetching param value.');
      };
  }

  fetchLetterDetails() {
    var id: number = this.letterId;

    // this.letterDetails$ = this.letterService.getLetterDetails(id);
    // console.log(JSON.stringify(this.letterDetails$));
    this.letterService.getLetterDetails(id).subscribe((data) => {
      this.letter = data;
      console.log(data);

      this.letterReceiver = data.letterReceiver;
      this.affiliationCollege = data.affiliationCollege;
      this.licenceImage = data.photoLicence;
      this.billImage = data.requestList;
      /* this.letterVerifyForm.patchValue({
        letterReceiver: this.letterReceiver.name,
      }); */

      this.buildRegisterForm();
    });
  }

  buildRegisterForm() {
    this.letterVerifyForm = this.formBuilder.group({
      regNo: [this.letter.regNo],
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
      letterReceiver: [this.letter.letterReceiver],
      affiliationCollege: [this.letter.affiliationCollege],
    });
  }

  onVerify() {
    const id = this.letterId;
    this.letterService.isVerfied(id).subscribe(
      (res) => {
        this.router.navigate(['/home/letter/letter-list']);
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }
  onReject() {
    console.log('reject clicked');

    const id = this.letterId;
    this.letterService.isRejected(id).subscribe(
      (res) => {
        this.router.navigate(['/home/letter/letter-list']);
      },
      (err) => {
        this.toastr.error(err.error);
      }
    );
  }
}
