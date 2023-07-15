import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntrepreneurComponent } from './entrepreneur/entrepreneur.component';
import { UserComponent } from './user.component';
import { FreelancerComponent } from './freelancer/freelancer.component';
import { InvestorComponent } from './investor/investor.component';
import { RESTAPIService } from '../../restapiservice.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ UserComponent, FreelancerComponent,InvestorComponent,EntrepreneurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "f" when the user is freelancer',()=>{
    component.user='freelancer';
    expect(component.checkRole()).toBe('f');
 });

 it('should return "i" when the user is investor',()=>{
   component.user='investor';
   expect(component.checkRole()).toBe('i');
});

it('should return "e" when the user is entrepreneur',()=>{
 component.user='entrepreneur';
 expect(component.checkRole()).toBe('e');
});

it('should return "undefined" when the user is not of the three categories',()=>{
 component.user='';
 expect(component.checkRole()).toBe('undefined');
});


});

