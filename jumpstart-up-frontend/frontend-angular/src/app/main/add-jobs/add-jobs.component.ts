import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { RESTAPIService } from 'src/app/restapiservice.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css'],
  providers:[DatePipe]
})
export class AddJobsComponent {
  firstFormGroup = this._formBuilder.group({
    job_description: ['', Validators.required],
    job_type:['',Validators.required],
    is_active:['',Validators.required],
    numberOfOpenings:['',Validators.required],
    skills:['',Validators.required],
    pay_estimate:['',Validators.required],
    date:['',Validators.required],


  });
  isLinear = false;
  date=new Date()
  constructor(private _formBuilder: FormBuilder, private router: Router, private service : RESTAPIService, private datePipe: DatePipe) {
    // console.log(this.datePipe.transform(this.date,'yyyy-MM-dd'))
  }
  
  onSubmit(){

  const obj:{entrepreneurUuid:string, description:string, isActive:string, numberOfOpenings:string, skills:string, payEstimate:string, type:string, postingDate:string}={
    entrepreneurUuid: localStorage.getItem('uuid')??"",
    description: this.firstFormGroup.value.job_description??"",
    isActive: this.firstFormGroup.value.is_active??"",
    numberOfOpenings: this.firstFormGroup.value.numberOfOpenings??"",
    skills: this.firstFormGroup.value.skills??"",
    payEstimate: this.firstFormGroup.value.pay_estimate??"",
    type: this.firstFormGroup.value.job_type??"",
    // postingDate: this.firstFormGroup.value.date??""
    postingDate: this.datePipe.transform(this.date,'yyyy-MM-dd')??""
  };
  const body: string = JSON.stringify(obj);

  this.service.postJobs(body).subscribe({
    complete: () => { 
      this.router.navigate(['home']) 
    }
  });


  }

}
