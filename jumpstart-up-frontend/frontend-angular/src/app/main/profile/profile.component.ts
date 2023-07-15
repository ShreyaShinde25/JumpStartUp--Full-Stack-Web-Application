import { Component } from '@angular/core';
import { RESTAPIService } from 'src/app/restapiservice.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  email:string=localStorage.getItem('email')??""
  type:string =localStorage.getItem('type')??""
  uuid : string =localStorage.getItem('uuid')??""
  username:string =localStorage.getItem('username')??""
  phone :string=''
  domain : string =''
  institution:string=''
  degree : string=''
  major : string =''
  year: string =''
  work_experience=''
  fullName=''
  skills:string =''
  company_name=''
  stakeholder=''
  company_size=''
  funding_status=''
  equity_offered=''
  assets=''
  profits_in_last_fy=''
  open_to_negotiations=''
  pitch=''
  linkedin_link=''
  funding_available=''
  brands_built=''

constructor (private service: RESTAPIService){

  if (this.type == 'investor') {
    this.investor_profile();
  }
  
  else if( this.type=='entrepreneur'){
    this.entrepreneur_profile();
  
     
     }
  
  else if (this.type=='freelancer'){
    this.freelancer_profile();
  }
  }

async freelancer_profile(){
  await firstValueFrom(this.service.getFreelancerUuid(this.uuid)).then((body: any)=>{
    console.log(body);
    // this.username= body['username']
    this.email= localStorage.getItem('email')??""
    this.phone= body['phone_number']
    this.domain= body['domain']
    this.institution= body['institution']
    this.degree= body['degree']
    this.major =body['major']
    this.year =body['year_of_completion']
    this.work_experience= body['work_experience']
    this.fullName= body['firstName']+' '+body['lastName']
    this.skills=body['skills']
    this.linkedin_link=body['linkedin_link']
  })
}

async entrepreneur_profile(){
  await firstValueFrom(this.service.getEntrepreneurUuid(this.uuid)).then((body: any)=>{
    console.log(body);
    // this.username= body['username']
    this.email= localStorage.getItem('email')??""
    this.phone= body['phone_number']
    this.domain= body['domain']
    this.institution= body['institution']
    this.degree= body['degree']
    this.major =body['major']
    this.year =body['year_of_completion']
    this.work_experience= body['work_experience']
    this.fullName= body['firstName']+' '+body['lastName']

    this.company_name=body['company_name']
    this.stakeholder=body['stakeholder']
    this.company_size=body['company_size']
    this.funding_status=body['funding_status']
    this.equity_offered=body['equity_offered']
    this.open_to_negotiations=body['open_to_negotiations']
    this.assets=body['assets']
    this.profits_in_last_fy=body['profits_in_last_fy']
    this.pitch=body['pitch']
    this.linkedin_link=body['linkedin_link']

  })
}
async investor_profile(){
  await firstValueFrom(this.service.getInvestorUuid(this.uuid)).then((body: any)=>{
    console.log(body);
    // this.username= body['username']
    // this.email= body['email']
    this.email= localStorage.getItem('email')??""
    this.phone= body['phone_number']
    this.domain= body['domain']
    this.institution= body['institution']
    this.degree= body['degree']
    this.major =body['major']
    this.year =body['year_of_completion']
    this.work_experience= body['work_experience']
    this.fullName= body['firstName']+' '+body['lastName']
    this.funding_available=body['funding_available']
    this.brands_built=body['brands_built']
    this.linkedin_link=body['linkedin_link']


  })
}




}
