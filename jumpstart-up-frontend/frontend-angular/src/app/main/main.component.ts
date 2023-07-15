import { Component } from '@angular/core';

import {  Router} from '@angular/router';
import { EntrepreneurComponent } from './user/entrepreneur/entrepreneur.component';
import { FreelancerComponent } from './user/freelancer/freelancer.component';
import { InvestorComponent } from './user/investor/investor.component';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[EntrepreneurComponent, FreelancerComponent, InvestorComponent]
})
export class MainComponent {
 
currentRoute: string= ''; 

constructor(public router: Router, private entrepreneur: EntrepreneurComponent, private freelancer: FreelancerComponent, private investor: InvestorComponent){
  console.log('harshu')
}
   

}