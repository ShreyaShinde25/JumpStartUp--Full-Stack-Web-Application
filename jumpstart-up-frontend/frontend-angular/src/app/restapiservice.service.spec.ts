import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule ,HttpTestingController} from "@angular/common/http/testing";
import { RESTAPIService } from './restapiservice.service';


describe('RESTAPIServiceService', () => {
  let service: RESTAPIService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(RESTAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post user creation data', () => {
    const createUser = { name: 'test', email: 'test@test.com', password: 'password' };
    service.postCreateUser(createUser).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/login/signup');
    expect(req.request.method).toBe('POST');
    req.flush({}); // Mock response
  });

  it('should post user login data', () => {
    const user = { email: 'test@test.com', password: 'password' };
    service.postLoginUser(user).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/login');
    expect(req.request.method).toBe('POST');
    req.flush({}); // 
  });

  it('should post freelancer details', () => {
    const details = { name: 'test', email: 'test@test.com', skills: ['skill1', 'skill2'] };
    service.postAddFreelancerDetails(details).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/freelancer/add');
    expect(req.request.method).toBe('POST');
    req.flush({}); // Mock response
  });

  it('should put user details', () => {
    const details = { name: 'test', email: 'test@test.com', password: 'password' };
    service.putUpdateUserDetails(details).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/login/updateUser');
    expect(req.request.method).toBe('PUT');
    req.flush({}); // Mock response
  });

  it('should post investor details', () => {
    const details = { name: 'test', email: 'test@test.com', investmentPreference: 'preference' };
    service.postAddInvestorDetails(details).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/investor/add');
    expect(req.request.method).toBe('POST');
    req.flush({}); // Mock response
  });

  it('should post entrepreneur details', () => {
    const details = { name: 'test', email: 'test@test.com', businessIdea: 'idea' };
    service.postAddEntrepreneurDetails(details).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/entrepreneur/add');
    expect(req.request.method).toBe('POST');
    req.flush({}); // Mock response
  });

  it('should post job details', () => {
    const details = { title: 'test', description: 'description' };
    service.postJobs(details).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/jobs/add');
    expect(req.request.method).toBe('POST');
  });

  it('should get Freelancer Uuid', () => {
    const uuid = '123'
    service.getFreelancerUuid(uuid).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/freelancer/123');
    expect(req.request.method).toBe('GET');
  });

  it('should get Investor Uuid', () => {
    const uuid = '123'
    service.getInvestorUuid(uuid).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/investor/123');
    expect(req.request.method).toBe('GET');
  });

  it('should get Entrepreneur Uuid', () => {
    const uuid = '123'
    service.getEntrepreneurUuid(uuid).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/entrepreneur/123');
    expect(req.request.method).toBe('GET');
  });

  it('should get job Uuid', () => {
    const uuid = '123'
    service.getJobUuid(uuid).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/jobs/123');
    expect(req.request.method).toBe('GET');
  });

  it('should get all job ', () => {
    service.getAllJobs().subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpMock.expectOne(service.url + '/jobs');
    expect(req.request.method).toBe('GET');
  });

});
