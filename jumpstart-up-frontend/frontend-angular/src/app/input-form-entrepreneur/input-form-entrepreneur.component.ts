import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { RESTAPIService } from '../restapiservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-input-form-entrepreneur',
  templateUrl: './input-form-entrepreneur.component.html',
  styleUrls: ['./input-form-entrepreneur.component.css']
})
export class InputFormEntrepreneurComponent {
user_name = localStorage.getItem('username')??""

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName:['',Validators.required],
    phoneNumber:['',Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    institutionName: ['', Validators.required],
    degree:['',Validators.required],
    major:['',Validators.required],
    yearOfCompletion:['',Validators.required],
    workExperience:['',Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
   
    domain: ['', Validators.required],
    company_name: ['', Validators.required],
    is_registered:['',Validators.required],
    stakeholder: ['', Validators.required],
    company_size: ['', Validators.required],
    funding_status: ['', Validators.required],
    equity_offered: ['', Validators.required],
    assets: ['', Validators.required],
    open_to_negotiations: ['',Validators.required],
    profits_in_last_fy: ['', Validators.required],
    pitch: ['', Validators.required],

    
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private service: RESTAPIService, private router: Router) {
  }

  onSubmit(){
    const putCall: {uuid:string, firstName: string, lastName: string}={
      uuid: localStorage.getItem('uuid')??"",
      firstName: this.firstFormGroup.value.firstName??"",
      lastName: this.firstFormGroup.value.lastName??"",
    }

    const obj: { uuid: string, emailId:string, phone_number:string, domain:string, institution: string, degree:string, major:string, year_of_completion:string, work_experience: string, company_name:string,is_registered: string, stakeholder: string,company_size:string,funding_status:string, equity_offered:string, assets:string , open_to_negotiations: string,profits_in_last_fy:string, pitch: string}={
      uuid: localStorage.getItem('uuid')??"",
      emailId:localStorage.getItem('email')??"",
      phone_number: this.firstFormGroup.value.phoneNumber??"",
      domain: this.thirdFormGroup.value.domain??"",
      institution:this.secondFormGroup.value.institutionName??"",
      degree:this.secondFormGroup.value.degree??"",
      major:this.secondFormGroup.value.major??"",
      year_of_completion: this.secondFormGroup.value.yearOfCompletion??"",
      work_experience: this.secondFormGroup.value.workExperience??"",
      company_name: this.thirdFormGroup.value.company_name??"",
      is_registered: this.thirdFormGroup.value.is_registered??"",
      stakeholder: this.thirdFormGroup.value.stakeholder??"",
      company_size: this.thirdFormGroup.value.company_size??"",
      funding_status: this.thirdFormGroup.value.funding_status??"",
      equity_offered: this.thirdFormGroup.value.equity_offered??"",
      assets: this.thirdFormGroup.value.assets??"",
      open_to_negotiations: this.thirdFormGroup.value.open_to_negotiations??"",
      profits_in_last_fy:this.thirdFormGroup.value.profits_in_last_fy??"",
      pitch: this.thirdFormGroup.value.pitch??""
    }

    const body: string = JSON.stringify(obj);
    this.service.putUpdateUserDetails(putCall).subscribe({
      complete: () => { 
        console.log('put call completed');
      }
    })
    this.service.postAddEntrepreneurDetails(body).subscribe({
      complete: () => { 
        this.router.navigate(['home']) 
      }
    });
  }
}
