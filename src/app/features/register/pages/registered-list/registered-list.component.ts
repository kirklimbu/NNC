import { ActivatedRoute, Route, Router } from '@angular/router';
import { Letter } from './../../../../core/models/letter.model';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss'],
})
export class RegisteredListComponent implements OnInit {
  // props
  displayedColumns: string[] = ['Id', 'name', 'regNo', 'Action'];
  letterListDataSource: MatTableDataSource<any>;
  letterListDataSource$: Observable<any>;
  filtereedletterListDataSource$: Observable<any>;
  student: any;
  letterStatuses = ['Verified', 'Not-verified', 'All'];

  constructor(
    private registerService: RegisterService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.fetchLetterList();
    this.fetchLetterList();
  }

  fetchLetterList() {
    this.letterListDataSource$ = this.registerService.getLetterList();
    console.log(this.letterListDataSource$);
  }

  onEdit(letter) {}

  onDelete() {}

  onVerifyDetails(mode, letter: Letter) {
    console.log(mode + JSON.stringify(letter));

    const link: any = mode === 'add' ? 'add-letter' : 'verify/' + letter.regNo;
    this.router.navigate([link], { relativeTo: this.route });
  }

  onFilter(status) {
    console.log(status);
    this.letterListDataSource$ = this.registerService.getFilteredLetters(
      status
    );
  }
}
