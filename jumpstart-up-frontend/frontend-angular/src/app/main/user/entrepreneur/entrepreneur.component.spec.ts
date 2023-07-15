import { ComponentFixture, TestBed , fakeAsync, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RESTAPIService } from '../../../restapiservice.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { EntrepreneurComponent } from './entrepreneur.component';

describe('EntrepreneurComponent', () => {
  let component: EntrepreneurComponent;
  let fixture: ComponentFixture<EntrepreneurComponent>;
  let restApiService: RESTAPIService;
  let router: Router;
  let navigateSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      declarations: [ EntrepreneurComponent ],
      providers: [RESTAPIService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurComponent);
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
    spyOn(restApiService, 'getAllInvestors').and.returnValue(of(mockResponse));

    // Call the function to test
    await component.displayinvestors();

    // Expect the investor object to be set with the mock response
   
  });

  it('should display all investors', async () => {
    // Create a mock response from the service
    const mockResponse = [{ name: 'Investor A' }, { name: 'Investor B' }];

    // Spy on the service method and return the mock response
    spyOn(restApiService, 'getAllFreelancers').and.returnValue(of(mockResponse));

    // Call the function to test
    await component.displayFreelancers();

    // Expect the investor object to be set with the mock response
   
  });

  it('should navigate to view investor page', () => {
    const uuid = '1234';
    component.viewInvestors(uuid);
    expect(navigateSpy).toHaveBeenCalledWith(['/view'], {
      queryParams: { id: uuid, type: 'investor' }
    });
  });

  it('should navigate to view freelancer page', () => {
    const uuid = '5678';
    component.viewFreelancers(uuid);
    expect(navigateSpy).toHaveBeenCalledWith(['/view'], {
      queryParams: { id: uuid, type: 'freelancer' }
    });
  });

});

describe( 'a', ()=>{
  let component: EntrepreneurComponent;
  let fixture: ComponentFixture<EntrepreneurComponent>;
  let restApiService: RESTAPIService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      declarations: [ EntrepreneurComponent ],
      providers: [RESTAPIService,{provide: Router, useValue: { url: '/home'} }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  })
  it('should pass', fakeAsync(() => {
  
    const myFunctionSpy = spyOn(EntrepreneurComponent.prototype, 'displayinvestors').and.stub();
    const service = new EntrepreneurComponent(restApiService,router);
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
  let component: EntrepreneurComponent;
  let fixture: ComponentFixture<EntrepreneurComponent>;
  let restApiService: RESTAPIService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      declarations: [ EntrepreneurComponent ],
      providers: [RESTAPIService,{provide: Router, useValue: { url: '/home/freelancer'} }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  })
  it('should pass', () => {
  
    const myFunctionSpy = spyOn(EntrepreneurComponent.prototype, 'displayFreelancers').and.stub();
    const service = new EntrepreneurComponent(restApiService,router);
    expect(myFunctionSpy).toHaveBeenCalledTimes(1);
  });
})



