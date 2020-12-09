import { Component, OnInit } from '@angular/core';
import {  faBars, faCoffee } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitter,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
// props
fabars = faBars;
active = 1;
faCoffee = faCoffee;
faTwitter = faTwitter;
/* faAtom = faAtom;
twitter = faTwitterSquare;
fb = faFacebookSquare;
insta = faInstagramSquare; */
  constructor() { }

  ngOnInit(): void {  }
}
