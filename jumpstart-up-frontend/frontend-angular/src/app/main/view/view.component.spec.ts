import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RESTAPIService } from 'src/app/restapiservice.service'; 
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { ViewComponent } from './view.component';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let mockActivatedRoute: any;
  let mockService: any;
  let mockRouter: any;

  beforeEach(async () => {

    mockActivatedRoute = { 
      queryParams: of({id: '123', type: 'investor'})
    };

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      declarations: [ ViewComponent ],
      providers: [RESTAPIService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.uuid = '123';
    component.type = 'investor'
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set uuid and type when query params change', () => {
    expect(component.uuid).toBe('123');
    expect(component.type).toBe('investor');
  });

  it('should retrieve freelancer profile data', async () => {
    const restapiService = TestBed.inject(RESTAPIService);
    const serviceSpy = spyOn(restapiService, 'getFreelancerUuid').and.returnValue(of({
      phone_number: '',
      domain: '',
      institution: '',
      degree: '',
      major: '',
      year_of_completion: '',
      work_experience: '',
      firstName: '',
      lastName: '',
      skills: ''
    }));
    component.uuid = '';
    component.freelancer_profile();
    expect(serviceSpy).toHaveBeenCalled();
    expect(component.phone).toEqual('');
    expect(component.domain).toEqual('');
    expect(component.institution).toEqual('');
    expect(component.degree).toEqual('');
    expect(component.major).toEqual('');
    expect(component.year).toEqual('');
    expect(component.work_experience).toEqual('');
    expect(component.fullName).toEqual('');
    expect(component.skills).toEqual('');
  });

  it('should retrieve entreprenuer profile data', async () => {
    const restapiService = TestBed.inject(RESTAPIService);
    const serviceSpy = spyOn(restapiService, 'getEntrepreneurUuid').and.returnValue(of({
      phone_number: '',
      domain: '',
      institution: '',
      degree: '',
      major: '',
      year_of_completion: '',
      work_experience: '',
      firstName: '',
      lastName: '',
      skills: ''
    }));
    component.uuid = '';
    component.entrepreneur_profile();
    expect(serviceSpy).toHaveBeenCalled();
    expect(component.phone).toEqual('');
    expect(component.domain).toEqual('');
    expect(component.institution).toEqual('');
    expect(component.degree).toEqual('');
    expect(component.major).toEqual('');
    expect(component.year).toEqual('');
    expect(component.work_experience).toEqual('');
    expect(component.fullName).toEqual('');
    expect(component.skills).toEqual('');
  });

  it('should retrieve investor profile data', async () => {
    const restapiService = TestBed.inject(RESTAPIService);
    const serviceSpy = spyOn(restapiService, 'getInvestorUuid').and.returnValue(of({
      phone_number: '',
      domain: '',
      institution: '',
      degree: '',
      major: '',
      year_of_completion: '',
      work_experience: '',
      firstName: '',
      lastName: '',
      skills: ''
    }));
    component.uuid = '';
    component.investor_profile();
    expect(serviceSpy).toHaveBeenCalled();
    expect(component.phone).toEqual('');
    expect(component.domain).toEqual('');
    expect(component.institution).toEqual('');
    expect(component.degree).toEqual('');
    expect(component.major).toEqual('');
    expect(component.year).toEqual('');
    expect(component.work_experience).toEqual('');
    expect(component.fullName).toEqual('');
    expect(component.skills).toEqual('');
  });
});
