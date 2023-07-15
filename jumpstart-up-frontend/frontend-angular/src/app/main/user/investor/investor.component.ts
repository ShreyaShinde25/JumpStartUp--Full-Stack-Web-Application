import { Component, Input} from '@angular/core';
import { RESTAPIService } from 'src/app/restapiservice.service';
import {firstValueFrom} from 'rxjs';
import { Router } from "@angular/router";



@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent {
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
  constructor(private service: RESTAPIService,private router: Router){
    this.childVar='';
    this.displayCompanies()
    

  }
  @Input() childVar: string;

 i:number=0
async displayCompanies(){
  await firstValueFrom(this.service.getAllCompanies()).then((body:any)=>{
    let len = body.length
  
    while(this.i<len){
    this.company_obj=body;
    this.i++;
    }

  })
}
viewCompanies(uuid:any){
 this.router.navigate(
  ['/view'],
  {queryParams:{id:uuid, type:'entrepreneur'}})
}


}
