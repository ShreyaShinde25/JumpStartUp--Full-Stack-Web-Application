import { Component, Input } from '@angular/core';
import { RESTAPIService } from 'src/app/restapiservice.service';
import {firstValueFrom} from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.css']
})
export class FreelancerComponent {

  job_obj=[{ 
        "jobUuid": "",
        "entrepreneurUuid": "",
        "description": "",
        "isActive": "",
        "numberOfOpenings": "",
        "skills": "",
        "payEstimate": "",
        "type": "",
        "postingDate": ""

  }]
  company_obj=[
    {"entrepreneurUUID": "",
          "company_name": "",
          "is_registered": "",
          "stakeholder": "",
          "company_size": "",
          "funding_status": "",
          "equity_offered": "",
          "assets": "",
          "open_to_negotiations": "",
          "profits_in_last_fy": "",
          "pitch": ""}
  ]
  flag:boolean=true
  constructor(private service: RESTAPIService,private router: Router ){
    if(this.router.url.includes('/home/jobs')==true){
      this.displayJobs()
      this.flag=false;
     }
   else if ( this.router.url.includes('/home')==true){
     this.displayCompanies()
   }

    this.childVar='';
  }
  @Input() childVar: string;
  i:number=0
  async displayJobs(){
    await firstValueFrom(this.service.getAllJobs()).then((body:any)=>{
      let len = body.length
      while(this.i<len){
      this.job_obj=body;
      console.log(this.job_obj);
      this.i++;
      }
      // console.log(this.investor_obj[1])
  
    })
  }
  j:number=0
  async displayCompanies(){
    await firstValueFrom(this.service.getAllCompanies()).then((body:any)=>{
      let len = body.length
    
      while(this.j<len){
      this.company_obj=body;
      console.log(this.company_obj);
      this.j++;
      }
      console.log(this.company_obj[1])
  
    })
  }
 
  viewJobDetails(jobUuid:string){
      console.log('inside view Investors')
      this.router.navigate(
       ['/displayjob'],
       {queryParams:{jobid:jobUuid}})
    }

    viewCompanies(uuid:any){
     this.router.navigate(
      ['/view'],
      {queryParams:{id:uuid, type:'entrepreneur'}})
    }
  }
 

