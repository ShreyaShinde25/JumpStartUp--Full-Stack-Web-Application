import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RESTAPIService} from '../restapiservice.service';
import { Router } from "@angular/router"
import { AuthenticationService } from '../authentication.service';
import { switchMap } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent {
  a = false ;
  constructor(
    private route: ActivatedRoute,
    private service: RESTAPIService,
    private router: Router,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) 

  {
    this.myfunction();

  }

  myfunction(){
    this.route.fragment.subscribe((fragment) => {
       if(fragment!=null){
         this.a= true
       }
    })
  }
  
  signUpForm = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z_]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pswd: new FormControl('', [Validators.required, Validators.minLength(5)]),
    type: new FormControl()
  })
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pswd: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  errorMsg: string = "";

    validationSignup() {
    if (this.invalidUserSignup()) {
      return false;
    }
    else {
      this.errorMsg = "";
      this.userSignUp();
      return true;
    }
  }

   validationLogin() {
    if (this.invalidUserlogin()) {
      return false;
    }
    else {
      this.errorMsg = "";
      this.userLogin();
      return true;
    };
  }
   invalidUserSignup() {
    const signupUser = this.signupUser();
    const emailSignUp= this.emailSignUp();
    const signuppass= this.signuppass();
    if (signupUser && signupUser.hasError('required')) {
      this.errorMsg = "*Username required";
      return true;
    }
    else if (signupUser && signupUser.invalid) {
      this.errorMsg = "*Invalid username";
      return true;
    }

    else if (emailSignUp && emailSignUp.hasError('required')) {
      this.errorMsg = "*E-mail address required";
      return true;
    }

    else if (emailSignUp && emailSignUp.invalid) {
      this.errorMsg = "*Invalid email address";
      return true;
    }
    else if (signuppass && signuppass.hasError('required')) {
      this.errorMsg = "*Password required";
      return true;
    }
    else if (signuppass && signuppass.invalid) {
      this.errorMsg = "*Password must contain atleast 5 characters";
      return true;
    }
    else return false;
  }

   signupUser() {
    return this.signUpForm.get('user')
  }

   emailSignUp() {
    return this.signUpForm.get('email')
  }

  signuppass() {
    return this.signUpForm.get('pswd')
  }

  userSignUp() {
    const obj: { username: string, email: string, hashpass: string, type: string } = {
      username: this.signUpForm.value.user??"",
      email: this.signUpForm.value.email??"",
      hashpass: this.signUpForm.value.pswd??"",
      type: this.signUpForm.value.type??""
    };
    const body: string = JSON.stringify(obj);
    this.firebaseSignUp(obj);
    this.postSignUpcall(body);

    }
  

   invalidUserlogin() {

    const userLoginGet = this.userLoginGet();
    const loginpass = this.loginpass();

    if (userLoginGet && userLoginGet.hasError('required')) {
      this.errorMsg = "*Username required"
      return true;
    }

    else if (loginpass && loginpass.hasError('required')) {
      this.errorMsg = "*Password required";
      return true;
    }
    else if (loginpass && loginpass.invalid) {
      this.errorMsg = "*Password must contain atleast 5 characters";
      return true;
    }

    else return false;
  }

  userLoginGet() {
    return this.loginForm.get('user');
  }

   loginpass() {
    return this.loginForm.get('pswd');
  }

  userLogin() {
    const obj: { username: string, hashpass: string } = {
      username: this.loginForm.value.user??"",
      hashpass: this.loginForm.value.pswd??""
    };
    const body: string = JSON.stringify(obj);
    this.firebaseLogin(obj);
    this.postLoginCall(body);
  }


  get varCheck(): boolean {
    if (this.errorMsg != "")
      return true;
    else
      return false;
  }

  postSignUpcall(body: string){
    this.service.postCreateUser(body).subscribe((details :any) => {
      {
        localStorage.setItem('username',details['username']);
        localStorage.setItem('type',details['type']);
        localStorage.setItem('uuid',details['uuid']);
        localStorage.setItem('email',details['email']);
        console.log(details);
        if (localStorage.getItem('type')=='freelancer')
          this.router.navigate(['addFreelancerDetails']) 
        else if(localStorage.getItem('type')=='investor')
          this.router.navigate(['addInvestorDetails'])
        else if (localStorage.getItem('type')=='entrepreneur')
          this.router.navigate(['addEntrepreneurDetails'])
      }
      });
  }

  postLoginCall(body: string){
    this.service.postLoginUser(body).subscribe((details :any) => {
      {
        localStorage.setItem('username',details['username']);
        localStorage.setItem('type',details['type']);
        localStorage.setItem('uuid',details['uuid']);
        localStorage.setItem('email',details['email']);
        this.router.navigate(['home']) 
      }
      });
  }

  firebaseSignUp(obj:any ){
    this.authService
      .signUp(obj.email,obj.hashpass)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid, email: obj.email, displayName: obj.username })
        )
      )
      .subscribe(() => {
      });
  }

  firebaseLogin(obj: any) {
    this.authService
      .login(obj.email, obj.hashpass)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  
} 
