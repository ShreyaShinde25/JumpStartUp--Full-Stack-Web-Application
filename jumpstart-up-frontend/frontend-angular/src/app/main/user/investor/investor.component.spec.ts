import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RESTAPIService } from '../../../restapiservice.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { InvestorComponent } from './investor.component';

describe('InvestorComponent', () => {
  let component: InvestorComponent;
  let fixture: ComponentFixture<InvestorComponent>;
  let restApiService: RESTAPIService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule],
      declarations: [ InvestorComponent ],
      providers: [RESTAPIService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(() => {
    router = TestBed.inject(Router);
    restApiService = TestBed.inject(RESTAPIService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display companies', async () => {
    interface Company {
      entrepreneurUUID: string;
      company_name: string;
      is_registered: string;
      stakeholder: string;
      company_size: string;
      funding_status: string;
      equity_offered: string;
      assets: string;
      open_to_negotiations: string;
      profits_in_last_fy: string;
      pitch: string;
    }

    const companies: Company[] = [
      { entrepreneurUUID: "123", company_name: "ABC Corp", is_registered: "Yes", stakeholder: "John Doe", company_size: "Large", funding_status: "Funded", equity_offered: "10%", assets: "10000", open_to_negotiations: "Yes", profits_in_last_fy: "100000", pitch: "We're a leading provider of XYZ products."},
      { entrepreneurUUID: "456", company_name: "XYZ Inc", is_registered: "No", stakeholder: "Jane Smith", company_size: "Small", funding_status: "Unfunded", equity_offered: "N/A", assets: "5000", open_to_negotiations: "No", profits_in_last_fy: "50000", pitch: "We're a startup focusing on innovative solutions."},
    ];

    spyOn(restApiService, 'getAllCompanies').and.returnValue(of(companies));

    await component.displayCompanies();

    expect(component.company_obj).toEqual(companies);
  });

  it('should navigate to company view', () => {
    const uuid = '1';
    const navigateSpy = spyOn(router, 'navigate');

    component.viewCompanies(uuid);

    expect(navigateSpy).toHaveBeenCalledWith(['/view'], {
      queryParams: { id: uuid, type: 'entrepreneur'},
    });
  });
});
