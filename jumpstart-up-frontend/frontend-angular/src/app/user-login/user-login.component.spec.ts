import { ComponentFixture, TestBed,fakeAsync,tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserLoginComponent } from './user-login.component';
import { RESTAPIService } from '../restapiservice.service';
import { AuthenticationService } from '../authentication.service';
import { UsersService } from '../users.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Auth, getIdTokenResult, User, user, UserCredential } from '@angular/fire/auth';
import { switchMap } from 'rxjs';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let restAPIServiceSpy: jasmine.SpyObj<RESTAPIService>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let router: Router;

  beforeEach(async () => {
    restAPIServiceSpy = jasmine.createSpyObj('RESTAPIService', ['postCreateUser', 'postLoginUser']);
    authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login','signUp']);
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [
        { provide: RESTAPIService, useValue: restAPIServiceSpy },
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
        { provide: UsersService, useValue: usersServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('validationSignup', () => {
    it('should return false if invalidUserSignup is true', () => {
      spyOn(component, 'invalidUserSignup').and.returnValue(true);

      const result = component.validationSignup();

      expect(result).toBeFalse();
    });

    it('should call userSignUp if invalidUserSignup is false', () => {
      spyOn(component, 'invalidUserSignup').and.returnValue(false);
      spyOn(component, 'userSignUp');

      component.validationSignup();

      expect(component.userSignUp).toHaveBeenCalled();
    });
  });

  describe('validationLogin', () => {
    it('should return false if invalidUserlogin is true', () => {
      spyOn(component, 'invalidUserlogin').and.returnValue(true);

      const result = component.validationLogin();

      expect(result).toBeFalse();
    });
  })

  it('should return the "user" userLoginGet FormControl',()=>{
    expect(component.userLoginGet()).toEqual(component.loginForm.get('user'));
  });

  it('should return the "user" signUpUser FormControl',()=>{
    expect(component.signupUser()).toEqual(component.signUpForm.get('user'));
  });

  it('should return the "user" emailSignUp FormControl',()=>{
    expect(component.emailSignUp()).toEqual(component.signUpForm.get('email'));
  });
  
  it('should return the "user" signuppass FormControl',()=>{
    expect(component.signuppass()).toEqual(component.signUpForm.get('pswd'));
  });

  it('should return the "user" loginpass FormControl',()=>{
    expect(component.loginpass()).toEqual(component.loginForm.get('pswd'));
  });
  
  it('ValidationSignup should return false and display error message if username is missing', () => {
    component.signUpForm.controls.user.setValue('')
    component.signUpForm.controls.email.setValue('john@example.com')
    component.signUpForm.controls.pswd.setValue('john@123')
    component.signUpForm.controls.type.setValue('investor')
    const result = component.validationSignup();
    expect(result).toBe(false);
    expect(component.errorMsg).toBe('*Username required');
  });
  it('ValidationSignup should return false and display error message if email is missing', () => {
    component.signUpForm.controls.user.setValue('john')
    component.signUpForm.controls.email.setValue('')
    component.signUpForm.controls.pswd.setValue('john@123')
    component.signUpForm.controls.type.setValue('investor')

    const result = component.validationSignup();
    expect(result).toBe(false);
    expect(component.errorMsg).toBe('*E-mail address required');
  });

  it('ValidationSignup should return false and display error message if password is missing', () => {
    component.signUpForm.controls.user.setValue('john')
    component.signUpForm.controls.email.setValue('john@example.com')
    component.signUpForm.controls.pswd.setValue('')
    component.signUpForm.controls.type.setValue('investor')

    const result = component.validationSignup();
    expect(result).toBe(false);
    expect(component.errorMsg).toBe('*Password required');
  });

  it('ValidationSignup should return false and display error message if password is missing', () => {
    component.signUpForm.controls.user.setValue('*01')
    component.signUpForm.controls.email.setValue('john@example.com')
    component.signUpForm.controls.pswd.setValue('john@123')
    component.signUpForm.controls.type.setValue('investor')

    const result = component.validationSignup();
    expect(result).toBe(false);
    expect(component.errorMsg).toBe('*Invalid username');
  });

   

  it('ValidationSignup should return false and display error message if email address is invalid', () => {
    component.signUpForm.controls.user.setValue('john')
    component.signUpForm.controls.email.setValue('john')
    component.signUpForm.controls.pswd.setValue('john@123')
    component.signUpForm.controls.type.setValue('investor')

    const result = component.validationSignup();
    expect(result).toBe(false);
    expect(component.errorMsg).toBe('*Invalid email address');
  });
  
  it('ValidationSignup should return false and display error message if password characters do not match', () => {
    component.signUpForm.controls.user.setValue('john')
    component.signUpForm.controls.email.setValue('john@example.com')
    component.signUpForm.controls.pswd.setValue('joh')
    component.signUpForm.controls.type.setValue('investor')

    const result = component.validationSignup();
    expect(result).toBe(false);
    expect(component.errorMsg).toBe('*Password must contain atleast 5 characters');
  });
 
//Login

it('"validationLogin" should return false if username is missing', () => {
  component.loginForm.controls.user.setValue('')
  component.loginForm.controls.pswd.setValue('john@123')

  const result = component.validationLogin();

  expect(result).toBe(false);
  expect(component.errorMsg).toBe('*Username required');
});

it('"validationLogin" should return false if password is missing', () => {
  component.loginForm.controls.user.setValue('john')
  component.loginForm.controls.pswd.setValue('')

  const result = component.validationLogin();

  expect(result).toBe(false);
  expect(component.errorMsg).toBe('*Password required');
});

it('"validationLogin" should return false if password characters do not match', () => {
  component.loginForm.controls.user.setValue('john')
  component.loginForm.controls.pswd.setValue('joh')

  const result = component.validationLogin();

  expect(result).toBe(false);
  expect(component.errorMsg).toBe('*Password must contain atleast 5 characters');
});

it('should log in and navigate to home', () => {
  const email = 'test@test.com';
  const password = 'password';
  authenticationServiceSpy.login.and.returnValue(of())
  component.firebaseLogin({ email: email, hashpass: password });
  //expect(router.navigate).toHaveBeenCalledWith(['home']);
});

it('should call postSignUpcall', ()=>{
  restAPIServiceSpy.postCreateUser.and.returnValue(of({username:"harsh",type: "freelancer"}));
  component.postSignUpcall("abc");
  expect(router.navigate).toHaveBeenCalledWith(['addFreelancerDetails']);
})

it('should call postSignUpcall', ()=>{
  restAPIServiceSpy.postCreateUser.and.returnValue(of({username:"harsh",type: "investor"}));
  component.postSignUpcall("abc");
  expect(router.navigate).toHaveBeenCalledWith(['addInvestorDetails']);
})

it('should call postSignUpcall', ()=>{
  restAPIServiceSpy.postCreateUser.and.returnValue(of({username:"harsh",type: "entrepreneur"}));
  component.postSignUpcall("abc");
  expect(router.navigate).toHaveBeenCalledWith(['addEntrepreneurDetails']);
})

it('should call postLoginCall', ()=>{
  restAPIServiceSpy.postLoginUser.and.returnValue(of({username:"harsh"}));
  component.postLoginCall("abc");
  expect(router.navigate).toHaveBeenCalledWith(['home']);
})


});

describe('check', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let restapiService: RESTAPIService;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login','signUp']);
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['addUser']);
    await TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [RESTAPIService,{ provide: AuthenticationService, useValue:  authenticationServiceSpy },
      {provide: UsersService, useValue: usersServiceSpy}]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserLoginComponent);
    restapiService = TestBed.inject(RESTAPIService);
    spyOn(restapiService, 'postCreateUser').and.returnValue(of({}));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('userSignup',fakeAsync(()=>{
    component.signUpForm.controls.user.setValue('john')
    component.signUpForm.controls.pswd.setValue('joh')
    component.signUpForm.controls.email.setValue('abc@xyz.com')
    component.signUpForm.controls.type.setValue('freelancer')
    component.userSignUp();
    const id: any ={};
    const user: User = {
      email: 'abc@xyz.com',
      emailVerified: true,
      isAnonymous: false,
      displayName: 'john',
      phoneNumber: null,
      photoURL: 'https://www.example.com/user.png',
      providerId: 'google.com',
      uid: '1234567890',
      metadata: {
        creationTime: 'Wed, 07 Apr 2023 00:00:00 GMT',
        lastSignInTime: 'Wed, 07 Apr 2023 00:05:00 GMT'
      },
      providerData: [
      ],
      refreshToken: 'example-refresh-token',
      tenantId: null,
      delete: async () => { /* implementation */ },
      getIdToken: async (forceRefresh?: boolean | undefined) => { return '' },
      getIdTokenResult: async (async: boolean | undefined)  => { return id },
      reload: async () => { /* implementation */ },
      toJSON: () => { return id }
    }
    const myUserCredential: UserCredential = {
      user : user,
      providerId: 'google.com',
      operationType: 'signIn'
    };
    
    spyOn(authenticationServiceSpy, 'signUp').and.returnValue(of(myUserCredential));
    usersServiceSpy.addUser({uid: '1234567890', email: 'abc@xyz.com', displayName: 'john' }).subscribe(
      res => {
        expect(res.Length).toBe(1)
      }
    )
    expect(component.firebaseSignUp).toBeTruthy();
    expect(restapiService.postCreateUser).toHaveBeenCalled();
  }))
    
  });
