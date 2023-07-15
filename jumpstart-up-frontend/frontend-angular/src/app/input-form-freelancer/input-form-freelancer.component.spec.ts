import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputFormFreelancerComponent } from './input-form-freelancer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RESTAPIService } from '../restapiservice.service';
import { of } from 'rxjs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from '../main/main.component';
import { Router } from '@angular/router';

describe('InputFormFreelancerComponent', () => {
  let component: InputFormFreelancerComponent;
  let fixture: ComponentFixture<InputFormFreelancerComponent>;
  let restapiService: RESTAPIService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        MatStepperModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(
          [{path: 'home', component: MainComponent}]
        )
      ],
      declarations: [ InputFormFreelancerComponent ],
      providers: [ RESTAPIService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFormFreelancerComponent);
    component = fixture.componentInstance;
    restapiService = TestBed.inject(RESTAPIService);
    router = TestBed.inject(Router);
    spyOn(restapiService, 'putUpdateUserDetails').and.returnValue(of({}));
    spyOn(restapiService, 'postAddFreelancerDetails').and.returnValue(of({}));
    spyOn(router, 'navigate').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call putUpdateUserDetails and postAddFreelancerDetails with the right data', () => {
    component.firstFormGroup.setValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      skills: 'Angular, TypeScript',
      linkedinLink: 'https://www.linkedin.com/in/john-doe'
    });
    component.secondFormGroup.setValue({
      institutionName: 'ABC University',
      degree: 'Bachelor of Engineering',
      major: 'Computer Science',
      yearOfCompletion: '2022',
      workExperience: 'Frontend Developer at XYZ Company'
    });

    component.onSubmit();

    expect(restapiService.putUpdateUserDetails).toHaveBeenCalledWith({
      uuid: localStorage.getItem('uuid') ?? '',
      firstName: 'John',
      lastName: 'Doe'
    });
    expect(restapiService.postAddFreelancerDetails).toHaveBeenCalledWith(JSON.stringify({
      uuid: localStorage.getItem('uuid') ?? '',
      username: localStorage.getItem('username') ?? '',
      phone_number: '1234567890',
      skills: 'Angular, TypeScript',
      linkedin_link: 'https://www.linkedin.com/in/john-doe',
      institution: 'ABC University',
      degree: 'Bachelor of Engineering',
      major: 'Computer Science',
      year_of_completion: 2022,
      work_experience: 'Frontend Developer at XYZ Company'
    }));
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should call putUpdateUserDetails and postAddFreelancerDetails with the null data', () => {
    component.firstFormGroup.setValue({
      firstName: null,
      lastName: null,
      phoneNumber: null,
      skills: null,
      linkedinLink: null
    });
    component.secondFormGroup.setValue({
      institutionName: null,
      degree: null,
      major: null,
      yearOfCompletion: null,
      workExperience: null
    });

    component.onSubmit();

    expect(restapiService.putUpdateUserDetails).toHaveBeenCalledWith({
      uuid: localStorage.getItem('uuid') ?? '',
      firstName: '',
      lastName: ''
    });
    expect(restapiService.postAddFreelancerDetails).toHaveBeenCalledWith(JSON.stringify({
      uuid: localStorage.getItem('uuid') ?? '',
      username: localStorage.getItem('username') ?? '',
      phone_number: '',
      skills: '',
      linkedin_link: '',
      institution: '',
      degree: '',
      major: '',
      year_of_completion: 0,
      work_experience: ''
    }));
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

});
