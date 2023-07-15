import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EntrepreneurComponent } from '../user/entrepreneur/entrepreneur.component';
import { FreelancerComponent } from '../user/freelancer/freelancer.component';
import { InvestorComponent } from '../user/investor/investor.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 
  constructor(private router: Router, private entrepreneur: EntrepreneurComponent, private freelancer: FreelancerComponent, private investor:InvestorComponent){
  }
// ngOnInit(): void{
   viewInvestor(){
    this.router.navigate(['home'])
    this.entrepreneur.displayinvestors()
  }
  viewFreelancer(){
    this.router.navigate(['home/freelancer'])
    this.entrepreneur.displayFreelancers()
  }
  addJobPostings(){
    this.router.navigate(['addJobs'])
  } 
  openChat(){
    this.router.navigate(['chat'])
  }

  viewStartUps(){
    console.log("view startups")
    this.router.navigate(['home'])
    this.freelancer.displayCompanies()
  }

  displayCompanies(){
    console.log("view startups")
    this.router.navigate(['home'])
    this.investor.displayCompanies()
  }

  viewJobs(){
    this.router.navigate(['home/jobs'])
    this.freelancer.displayJobs()
  }
  
  // user:string= "entrepreneur";
  user :string= localStorage.getItem('type')??""
  user_name = localStorage.getItem('username')??""
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

  go_to_profile_page(){
    console.log("shreya here")
    this.router.navigate(['profile'])
  }

}
