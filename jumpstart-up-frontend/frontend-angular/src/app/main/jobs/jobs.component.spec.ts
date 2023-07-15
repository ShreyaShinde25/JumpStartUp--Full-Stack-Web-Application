// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { JobsComponent } from './jobs.component';

// describe('JobsComponent', () => {
//   let component: JobsComponent;
//   let fixture: ComponentFixture<JobsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ JobsComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(JobsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RESTAPIService } from 'src/app/restapiservice.service';
import { JobsComponent } from './jobs.component';
import { of } from 'rxjs';
import { HttpClientModule} from '@angular/common/http';

describe('JobsComponent', () => {
  let service: RESTAPIService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        RESTAPIService,
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ jobid: '123' })
          }
        }
      ]
    });
    service = TestBed.inject(RESTAPIService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should initialize JobsComponent correctly', () => {
    const getJobUuidSpy = spyOn(service, 'getJobUuid').and.returnValue(of({
      description: 'test description',
      isActive: true,
      type: 'test type',
      numberOfOpenings: '5',
      skills: 'test skills',
      payEstimate: '1000',
      postingDate: '2022-01-01'
    }));
    const jobsComponent = new JobsComponent(service, router, activatedRoute);
    expect(jobsComponent.childVar).toBe('');
    expect(getJobUuidSpy).toHaveBeenCalledWith('123');
  });
});
