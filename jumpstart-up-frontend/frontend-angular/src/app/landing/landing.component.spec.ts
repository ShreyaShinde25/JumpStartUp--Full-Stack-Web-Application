import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { LandingComponent } from './landing.component';
import { Router } from '@angular/router';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let router: Router;
  let spy:jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports:[RouterTestingModule,HttpClientTestingModule],
      providers:[Router]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router=TestBed.inject(Router);
    spy=spyOn(router,'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /login-signup',()=>{
  component.urlNavSignUp();
  expect(spy).toHaveBeenCalledWith(['/login-signup']);
  });

});
