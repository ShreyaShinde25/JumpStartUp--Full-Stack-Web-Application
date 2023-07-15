import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RESTAPIService } from 'src/app/restapiservice.service'; 
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddJobsComponent } from './add-jobs.component';

describe('AddJobsComponent', () => {
  let component: AddJobsComponent;
  let fixture: ComponentFixture<AddJobsComponent>;
  let router:Router
  let restapiService: RESTAPIService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule,MatStepperModule,MatFormFieldModule,MatButtonModule,MatInputModule,
        ReactiveFormsModule, FormsModule,BrowserAnimationsModule],
      declarations: [ AddJobsComponent ],
      providers: [RESTAPIService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobsComponent);
    restapiService = TestBed.inject(RESTAPIService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.stub();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post job and navigate to home page', () => {
    spyOn(restapiService, 'postJobs').and.returnValue(of({}));
    component.firstFormGroup.setValue({
      job_description: 'test description',
        is_active: 'true',
        numberOfOpenings: '2',
        skills: 'test skills',
        pay_estimate: '5000',
        job_type: 'full-time',
        date: '2022-01-01',
    })

    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should post job and navigate to home page empty', () => {
    spyOn(restapiService, 'postJobs').and.returnValue(of({}));
    component.firstFormGroup.setValue({
      job_description: null,
        is_active: null,
        numberOfOpenings: null,
        skills: null,
        pay_estimate: null,
        job_type: null,
        date: null,
    })

    component.onSubmit();

    expect(restapiService.postJobs).toHaveBeenCalledWith(JSON.stringify({
      entrepreneurUuid: localStorage.getItem('uuid') ?? '',
      description: '',
      isActive: '',
      numberOfOpenings: '',
      skills: '',
      payEstimate: '',
      type: '',
      postingDate: '2023-04-08',
    }));
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

});
