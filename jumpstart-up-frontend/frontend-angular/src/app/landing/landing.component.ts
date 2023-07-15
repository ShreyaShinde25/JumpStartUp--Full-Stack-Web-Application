import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import ScrollReveal from 'scrollreveal';
import { Router } from '@angular/router';

declare global {
  interface Window {
    sr: any;
  }
}

declare const myanime: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent {

  constructor(private router: Router) {
  }
  urlNavSignUp() {
    // console.log('hey there'); testing purpose
    this.router.navigate(['/login-signup']);
  }

}
