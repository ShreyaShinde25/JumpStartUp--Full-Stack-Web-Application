import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RESTAPIService } from '../../restapiservice.service';
import { of } from 'rxjs';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,],
      declarations: [ ProfileComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Test Investor Local Storage', () => {
    beforeEach(async () => {
      localStorage.setItem('type','Investor');
    });
    it('should call initializer function in constructor', () => {
      TestBed.createComponent(ProfileComponent); // this is the trigger of constructor method
      expect(component.investor_profile).toHaveBeenCalled // sample jasmine spy based test case
    });
  });

  describe('Test Freelancer Local Storage', () => {
    beforeEach(async () => {
      localStorage.setItem('type','Freelancer');
    });
    it('should call initializer function in constructor', () => {
      TestBed.createComponent(ProfileComponent); // this is the trigger of constructor method
      expect(component.freelancer_profile).toHaveBeenCalled // sample jasmine spy based test case
    });
  });

  describe('Test Entrepreneur Local Storage', () => {
    beforeEach(async () => {
      localStorage.setItem('type','Entrepreneur');
    });
    it('should call initializer function in constructor', () => {
      TestBed.createComponent(ProfileComponent); // this is the trigger of constructor method
      expect(component.entrepreneur_profile).toHaveBeenCalled // sample jasmine spy based test case
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch investor profile', fakeAsync(() => {
    const restapiService = TestBed.inject(RESTAPIService);
    const getInvestorUuidSpy = spyOn(restapiService, 'getInvestorUuid').and.returnValue(of({
      phone_number: '1234567890',
      domain: 'example.com',
      institution: 'Example University',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      year_of_completion: '2022',
      work_experience: 'Software Engineer'
    }));
    component.investor_profile();
    tick();
  
    expect(getInvestorUuidSpy).toHaveBeenCalled();
    expect(component.phone).toEqual('1234567890');
    expect(component.domain).toEqual('example.com');
    expect(component.institution).toEqual('Example University');
    expect(component.degree).toEqual('Bachelor of Science');
    expect(component.major).toEqual('Computer Science');
    expect(component.year).toEqual('2022');
    expect(component.work_experience).toEqual('Software Engineer');
  }));

  it('should fetch freelancer profile', fakeAsync(() => {
    const restapiService = TestBed.inject(RESTAPIService);
    const getFreelancerUuidSpy = spyOn(restapiService, 'getFreelancerUuid').and.returnValue(of({
      phone_number: '1234567890',
      domain: 'example.com',
      institution: 'Example University',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      year_of_completion: '2022',
      work_experience: 'Software Engineer'
    }));

    component.freelancer_profile();
    tick();
  
    expect(getFreelancerUuidSpy).toHaveBeenCalled();
    expect(component.phone).toEqual('1234567890');
    expect(component.domain).toEqual('example.com');
    expect(component.institution).toEqual('Example University');
    expect(component.degree).toEqual('Bachelor of Science');
    expect(component.major).toEqual('Computer Science');
    expect(component.year).toEqual('2022');
    expect(component.work_experience).toEqual('Software Engineer');
  }));

  it('should fetch Entrepreneur profile', fakeAsync(() => {
    const restapiService = TestBed.inject(RESTAPIService);
    const getEntrepreneurUuidSpy = spyOn(restapiService, 'getEntrepreneurUuid').and.returnValue(of({
      phone_number: '1234567890',
      domain: 'example.com',
      institution: 'Example University',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      year_of_completion: '2022',
      work_experience: 'Software Engineer'
    }));

    component.entrepreneur_profile();
    tick();
  
    expect(getEntrepreneurUuidSpy).toHaveBeenCalled();
    expect(component.phone).toEqual('1234567890');
    expect(component.domain).toEqual('example.com');
    expect(component.institution).toEqual('Example University');
    expect(component.degree).toEqual('Bachelor of Science');
    expect(component.major).toEqual('Computer Science');
    expect(component.year).toEqual('2022');
    expect(component.work_experience).toEqual('Software Engineer');
  }));

});
