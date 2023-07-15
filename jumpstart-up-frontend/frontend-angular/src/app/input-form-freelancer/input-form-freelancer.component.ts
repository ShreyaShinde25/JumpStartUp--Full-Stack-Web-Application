import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { RESTAPIService} from '../restapiservice.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-input-form-freelancer',
  templateUrl: './input-form-freelancer.component.html',
  styleUrls: ['./input-form-freelancer.component.css']
})
export class InputFormFreelancerComponent {
 


   user_name = localStorage.getItem('username')??""

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName:['',Validators.required],
    phoneNumber:['',Validators.required],
    linkedinLink:['',Validators.required],
    skills:['',Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    institutionName: ['', Validators.required],
    degree:['',Validators.required],
    major:['',Validators.required],
    yearOfCompletion:['',Validators.required],
    workExperience:['',Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private service: RESTAPIService,private router: Router) {
  }

  onSubmit(){
    const putCall : {uuid: string, firstName: string, lastName: string} = {
      uuid: localStorage.getItem('uuid')??"",
      firstName: this.firstFormGroup.value.firstName??"",
      lastName: this.firstFormGroup.value.lastName??""
    }
    const obj: { uuid: string, username: string, phone_number: string,  skills: string,  linkedin_link: string,  institution: string, degree: string,  major: string, year_of_completion: number, work_experience:string } = {
      uuid: localStorage.getItem('uuid')??"",
      username: localStorage.getItem('username')??"",
      phone_number: this.firstFormGroup.value.phoneNumber??"",
      skills: this.firstFormGroup.value.skills??"",
      linkedin_link: this.firstFormGroup.value.linkedinLink??"",
      institution: this.secondFormGroup.value.institutionName??"",
      degree: this.secondFormGroup.value.degree??"",
      major: this.secondFormGroup.value.major??"",
      year_of_completion: Number(this.secondFormGroup.value.yearOfCompletion),
      work_experience: this.secondFormGroup.value.workExperience??""
    };
    const body: string = JSON.stringify(obj);
    this.service.putUpdateUserDetails(putCall).subscribe({
      complete: () => { 
        console.log('put call completed');
      }
    })
    this.service.postAddFreelancerDetails(body).subscribe({
      complete: () => { 
        this.router.navigate(['home']) 
      }
    });

  }
}
