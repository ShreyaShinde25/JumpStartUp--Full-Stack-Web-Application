import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EntrepreneurComponent } from '../user/entrepreneur/entrepreneur.component';
import { NavbarComponent } from './navbar.component';
import { HttpClientModule} from '@angular/common/http';
import { MainComponent } from '../main.component';
import { FreelancerComponent } from '../user/freelancer/freelancer.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let entrepreneurComponent: EntrepreneurComponent;
  let freelancerComponent: FreelancerComponent;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientModule],
      declarations: [NavbarComponent],
      providers: [EntrepreneurComponent,FreelancerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    RouterTestingModule.withRoutes(
      [{path: 'home', component: MainComponent}])
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    entrepreneurComponent = TestBed.inject(EntrepreneurComponent);
    freelancerComponent = TestBed.inject(FreelancerComponent);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home and call display investors', () => {
    spyOn(router, 'navigate').and.stub();
    const displayInvestorsSpy = spyOn(entrepreneurComponent, 'displayinvestors');
    component.viewInvestor();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
    expect(displayInvestorsSpy).toHaveBeenCalled();
  });

  it('should navigate to home and call display displayCompanies', () => {
    spyOn(router, 'navigate').and.stub();
    const freelancerComponentSpy = spyOn(freelancerComponent, 'displayCompanies');
    component.viewStartUps();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
    expect(freelancerComponentSpy).toHaveBeenCalled();
  });

  it('should navigate to home and call display displayJobs', () => {
    spyOn(router, 'navigate').and.stub();
    const freelancerComponentSpy = spyOn(freelancerComponent, 'displayJobs');
    component.viewJobs();
    expect(router.navigate).toHaveBeenCalledWith(['home/jobs']);
    expect(freelancerComponentSpy).toHaveBeenCalled();
  });
  

  it('should call display freelancers', () => {
    spyOn(entrepreneurComponent, 'displayFreelancers');
    component.viewFreelancer();
    expect(entrepreneurComponent.displayFreelancers).toHaveBeenCalled();
  });

  it('should navigate to add jobs', () => {
    spyOn(router, 'navigate'); // use router object in spyOn() function
    component.addJobPostings();
    expect(router.navigate).toHaveBeenCalledWith(['addJobs']);
  });

  it('should return the correct role', () => {
    component.user = 'freelancer';
    expect(component.checkRole()).toEqual('f');

    component.user = 'investor';
    expect(component.checkRole()).toEqual('i');

    component.user = 'entrepreneur';
    expect(component.checkRole()).toEqual('e');

    component.user = "";
    expect(component.checkRole()).toEqual('undefined');
  });

  it('should navigate to profile page', () => {
    spyOn(router, 'navigate');
    component.go_to_profile_page();
    expect(router.navigate).toHaveBeenCalledWith(['profile']);
  });
});
