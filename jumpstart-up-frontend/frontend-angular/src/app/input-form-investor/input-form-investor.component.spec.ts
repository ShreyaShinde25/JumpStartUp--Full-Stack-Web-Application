import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RESTAPIService } from '../restapiservice.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MainComponent } from '../main/main.component';

import { InputFormInvestorComponent } from './input-form-investor.component';

describe('InputFormInvestorComponent', () => {
  let component: InputFormInvestorComponent;
  let fixture: ComponentFixture<InputFormInvestorComponent>;
  let restapiService: RESTAPIService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatStepperModule,MatFormFieldModule,MatButtonModule,MatInputModule,BrowserAnimationsModule,ReactiveFormsModule,
      HttpClientModule,FormsModule,
      RouterTestingModule.withRoutes(
        [{path: 'home', component: MainComponent}]
      )
    ],
      declarations: [InputFormInvestorComponent],
      providers: [ RESTAPIService ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputFormInvestorComponent);
    component = fixture.componentInstance;
    restapiService = TestBed.inject(RESTAPIService);
    router = TestBed.inject(Router);
    spyOn(restapiService, 'putUpdateUserDetails').and.returnValue(of({}));
    spyOn(restapiService, 'postAddInvestorDetails').and.returnValue(of({}));
    spyOn(router, 'navigate').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call putUpdateUserDetails and postAddInvestorDetails with the right data', () => {
    component.firstFormGroup.setValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890'
    });
    component.secondFormGroup.setValue({
      institutionName: 'ABC University',
      degree: 'Bachelor of Engineering',
      major: 'Computer Science',
      yearOfCompletion: '2022',
      workExperience: 'Frontend Developer at XYZ Company'
    });
    component.thirdFormGroup.setValue({
      domain: 'IT',
      fundingAvailable: '60000000',
      brandBuild: 'Google'
    })

    component.onSubmit();

    expect(restapiService.putUpdateUserDetails).toHaveBeenCalledWith({
      uuid: localStorage.getItem('uuid') ?? '',
      firstName: 'John',
      lastName: 'Doe'
    });
    expect(restapiService.postAddInvestorDetails).toHaveBeenCalledWith(JSON.stringify({
      uuid: localStorage.getItem('uuid') ?? '',
      phone_number: '1234567890',
      domain: 'IT',
      funding_available: '60000000',
      brands_built: 'Google',
      institution: 'ABC University',
      degree: 'Bachelor of Engineering',
      major: 'Computer Science',
      year_of_completion: "2022",
      work_experience: 'Frontend Developer at XYZ Company',
    }));
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should call putUpdateUserDetails and postAddInvestorDetails with the null data', () => {
    component.firstFormGroup.setValue({
      firstName: null,
      lastName: null,
      phoneNumber: null
    });
    component.secondFormGroup.setValue({
      institutionName: null,
      degree: null,
      major: null,
      yearOfCompletion: null,
      workExperience: null
    });
    component.thirdFormGroup.setValue({
      domain: null,
      fundingAvailable: null,
      brandBuild: null
    })

    component.onSubmit();

    expect(restapiService.putUpdateUserDetails).toHaveBeenCalledWith({
      uuid: localStorage.getItem('uuid') ?? '',
      firstName: '',
      lastName: ''
    });
    expect(restapiService.postAddInvestorDetails).toHaveBeenCalledWith(JSON.stringify({
      uuid: localStorage.getItem('uuid') ?? '',
      phone_number: '',
      domain: '',
      funding_available: '',
      brands_built: '',
      institution: '',
      degree: '',
      major: '',
      year_of_completion: "",
      work_experience: '',
    }));
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});
