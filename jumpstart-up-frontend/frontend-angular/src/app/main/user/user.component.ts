import { Component} from '@angular/core';
import { MainComponent } from '../main.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  user :string= localStorage.getItem('type')??""

  checkRole(): string{
   if (this.user=="freelancer")
     return "f";
   else if( this.user=="investor")
     return "i";
   else if( this.user=="entrepreneur")
     return "e"
   else 
     return "undefined";
  }

}
