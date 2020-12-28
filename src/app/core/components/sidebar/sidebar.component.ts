import { Letter } from './../../models/letter.model';
import { RegisterService } from './../../../features/register/services/register.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/features/login/services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // props

  constructor(
    private router: Router,

    private registerService: RegisterService
  ) {}

  /* Props */
  recentStudents: any[] = [];
  ngOnInit(): void {
    // this.fetchAddedStudent();

  }

  fetchAddedStudent() {
    this.registerService.getFilteredLetters('P').subscribe((data) => {
      let students = data;
      this.recentStudents = students.splice(-4);
    });
  }
}
