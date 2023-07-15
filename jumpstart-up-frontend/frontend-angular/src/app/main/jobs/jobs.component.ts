import { Component, Input} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import { Router,ActivatedRoute } from "@angular/router";
import { RESTAPIService } from 'src/app/restapiservice.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  
  description:string=''
  is_active:string=''
  job_type:string=''
  noOfOpenings:string=''
  skills:string=''
  pay_estimate:string=''
  date:string=''
  jobId:string=''
  
  constructor(private service: RESTAPIService,private router: Router,private activatedRoute: ActivatedRoute){
    this.activatedRoute.queryParams.subscribe(params=>{
     this.jobId=params['jobid'] 
    });

    this.job_profile()
    this.childVar='';
  }
  @Input() childVar: string;
  async job_profile(){
    await firstValueFrom(this.service.getJobUuid(this.jobId)).then((body: any)=>{
      console.log(body);
      // this.username= body['username']
      this.description= body['description']
      this.is_active= body['isActive']
      this.job_type= body['type']
      this.noOfOpenings= body['numberOfOpenings']
      this.skills =body['skills']
      this.pay_estimate =body['payEstimate']
      this.date= body['postingDate']
    })
  }
  }


