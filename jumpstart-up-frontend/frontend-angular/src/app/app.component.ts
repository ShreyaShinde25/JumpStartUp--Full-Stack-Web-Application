import { Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //   constructor(private router: Router) {}
  
  title = 'jumpStartUp app is running!'

  // ngOnInit() {             // This redirects to home page after reload..
  //   this.router.navigate([''])
  // }

}

