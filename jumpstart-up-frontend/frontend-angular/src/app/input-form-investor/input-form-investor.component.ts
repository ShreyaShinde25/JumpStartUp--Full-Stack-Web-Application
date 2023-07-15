import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { RESTAPIService} from '../restapiservice.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-input-form-investor',
  templateUrl: './input-form-investor.component.html',
  styleUrls: ['./input-form-investor.component.css']
})
export class InputFormInvestorComponent {

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
    fundingAvailable: ['', Validators.required],
    brandBuild: ['', Validators.required],
  });
  
  isLinear = false;

  constructor(private _formBuilder: FormBuilder , private service : RESTAPIService, private router:Router) {
  }

  onSubmit(){

    const putCall: {uuid:string, firstName: string, lastName: string}={
      uuid: localStorage.getItem('uuid')??"",
      firstName: this.firstFormGroup.value.firstName??"",
      lastName: this.firstFormGroup.value.lastName??""
    }

    const obj: { uuid:string , phone_number: string, domain: string, funding_available: string , brands_built: string, institution:string, degree:string, major:string, year_of_completion: string, work_experience:string }={
    uuid:localStorage.getItem('uuid')??"",
    phone_number: this.firstFormGroup.value.phoneNumber??"",
    domain: this.thirdFormGroup.value.domain??"",
    funding_available: this.thirdFormGroup.value.fundingAvailable??"",
    brands_built: this.thirdFormGroup.value.brandBuild??"",
    institution:this.secondFormGroup.value.institutionName??"",
    degree:this.secondFormGroup.value.degree??"",
    major: this.secondFormGroup.value.major??"",
    year_of_completion: this.secondFormGroup.value.yearOfCompletion??"",
    work_experience: this.secondFormGroup.value.workExperience??""
    };

    const body: string = JSON.stringify(obj);

    this.service.putUpdateUserDetails(putCall).subscribe({
      complete: () => { 
        console.log('put call completed');
      }
    })
    this.service.postAddInvestorDetails(body).subscribe({
      complete: () => { 
        this.router.navigate(['home']) 
      }
    });


  }

}
