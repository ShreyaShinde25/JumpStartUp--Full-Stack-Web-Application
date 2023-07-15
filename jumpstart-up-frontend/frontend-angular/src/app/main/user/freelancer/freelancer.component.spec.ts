import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RESTAPIService } from 'src/app/restapiservice.service';
import { InvestorComponent } from '../investor/investor.component';

import { FreelancerComponent } from './freelancer.component';


describe('FreelancerComponent', () => {
  let component: FreelancerComponent;
  let fixture: ComponentFixture<FreelancerComponent>;
  let restApiService: RESTAPIService;
  let router: Router;
  let navigateSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      declarations: [ FreelancerComponent ],
      providers: [RESTAPIService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    restApiService = TestBed.inject(RESTAPIService);
    navigateSpy = spyOn(router, 'navigate').and.stub();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all investors', async () => {
    // Create a mock response from the service
    const mockResponse = [{ name: 'Investor A' }, { name: 'Investor B' }];

    // Spy on the service method and return the mock response
    spyOn(restApiService, 'getAllJobs').and.returnValue(of(mockResponse));

    // Call the function to test
    await component.displayJobs();

    // Expect the investor object to be set with the mock response
   
  });

  it('should display all investors', async () => {
    // Create a mock response from the service
    const mockResponse = [{ name: 'Investor A' }, { name: 'Investor B' }];

    // Spy on the service method and return the mock response
    spyOn(restApiService, 'getAllCompanies').and.returnValue(of(mockResponse));

    // Call the function to test
    await component.displayCompanies();

    // Expect the investor object to be set with the mock response
   
  });

  it('should navigate to view investor page', () => {
    const uuid = '1234';
    component.viewCompanies(uuid);
    expect(navigateSpy).toHaveBeenCalledWith(['/view'], {
      queryParams: { id: uuid, type: 'entrepreneur' }
    });
  });

  it('should navigate to view freelancer page', () => {
    const uuid = '5678';
    component.viewJobDetails(uuid);
    expect(navigateSpy).toHaveBeenCalledWith(['/displayjob'], {
      queryParams: { jobid: uuid }
    });
  });

});

describe( 'a', ()=>{
  let component: FreelancerComponent;
  let fixture: ComponentFixture<FreelancerComponent>;
  let restApiService: RESTAPIService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      declarations: [ FreelancerComponent ],
      providers: [RESTAPIService,{provide: Router, useValue: { url: '/home'} }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  })
  it('should pass', fakeAsync(() => {
  
    const myFunctionSpy = spyOn(FreelancerComponent.prototype, 'displayJobs').and.stub();
    const service = new FreelancerComponent(restApiService,router);
    const restapiService = TestBed.inject(RESTAPIService);
    spyOn(restapiService, 'getAllInvestors').and.returnValue(of({ 
       "uuid": "",
       "firstName": "",
       "lastName": "",
       "phone_number": "0",
       "domain": "",
       "linkedin_link": "",
       "funding_available": "",
       "brands_built": "",
       "institution": "",
       "degree": "",
       "major": "",
       "year_of_completion": "",
       "work_experience": ""}));
    
   tick();
    expect(myFunctionSpy).toHaveBeenCalledTimes(1);
  }));
})


describe( 'a', ()=>{
  let component: FreelancerComponent;
  let fixture: ComponentFixture<FreelancerComponent>;
  let restApiService: RESTAPIService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      declarations: [ FreelancerComponent ],
      providers: [RESTAPIService,{provide: Router, useValue: { url: '/home/freelancer'} }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  })
  it('should pass', () => {
  
    const myFunctionSpy = spyOn(FreelancerComponent.prototype, 'displayCompanies').and.stub();
    const service = new FreelancerComponent(restApiService,router);
    expect(myFunctionSpy).toHaveBeenCalledTimes(1);
  });
})
