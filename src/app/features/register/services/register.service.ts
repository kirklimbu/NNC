import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  /* props */
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  register(register): any {
    console.log(JSON.stringify(register));

    /* const formData = new FormData();
    formData.append('regNum', this.registerForm.value.regNum);
    formData.append('fullName', this.registerForm.value.photofullNameBill);
    formData.append('address', this.registerForm.value.address);
    formData.append('wardNum', this.registerForm.value.wardNum);
    formData.append('program', this.registerForm.value.program);
    formData.append('aff', this.registerForm.value.aff);
    formData.append('college', this.registerForm.value.college);
    formData.append('photoLicence', this.licenceImage, this.licenceImage.name);
    formData.append('photoBill', this.billImage, this.billImage.name);
    formData.append('file', this.registerForm.get('photoBill').value); */
    return this.http.post(`${this.API_URL}letter/save`, { ...register }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getLetterForm(): any {
    return this.http.get(`${this.API_URL}letter/form`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  testEdit(regNo): any {
    return this.http.get(`${this.API_URL}letter/form?regNo=${regNo}`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getSearchDetails(regNo): any {
    return this.http.get(`${this.API_URL}letter/form?regNo=${regNo}`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  getLetterList(): any {
    return this.http
      .get(`${this.API_URL}auth/letter/verify/list?status=${status}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  getFilteredLetters(status): any {
    return this.http
      .get(`${this.API_URL}auth/letter/verify/list?status=${status}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  getLetterDetails(id: number): any {
    return this.http
      .get(`${this.API_URL}auth/letter/verify/detail?id=${id}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  isVerfied(id: number): any {
    // console.log('student save service' + JSON.stringify(register));

    return this.http
      .post(`${this.API_URL}auth/letter/verify/save?id=${id}`, id)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  isRejected(id: number): any {
    // console.log('student save service' + JSON.stringify(register));
    return this.http
      .post(`${this.API_URL}auth/letter/reject/save?id=${id}`, id)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  // print
  getPrintDetails(id: number): any {
    return this.http.get(`${this.API_URL}auth/letter/print?id=${id}`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  savePrintInfo(id: number): any {
    // console.log('student save service' + JSON.stringify(register));
    return this.http
      .post(`${this.API_URL}auth/letter/print/save?id=${id}`, id)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
