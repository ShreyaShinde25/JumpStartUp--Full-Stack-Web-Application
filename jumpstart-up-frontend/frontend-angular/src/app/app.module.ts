import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginComponent } from './user-login/user-login.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import {UserComponent } from './main/user/user.component';
import { InvestorComponent } from './main/user/investor/investor.component';
import { FreelancerComponent } from './main/user/freelancer/freelancer.component';
import { EntrepreneurComponent } from './main/user/entrepreneur/entrepreneur.component';
import { HttpClientModule} from '@angular/common/http';
import { RESTAPIService } from './restapiservice.service';
import { InputFormInvestorComponent } from './input-form-investor/input-form-investor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { InputFormFreelancerComponent } from './input-form-freelancer/input-form-freelancer.component';
import { InputFormEntrepreneurComponent } from './input-form-entrepreneur/input-form-entrepreneur.component';
import { ProfileComponent } from './main/profile/profile.component';
import { JobsComponent } from './main/jobs/jobs.component';
import { ViewComponent } from './main/view/view.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { DateDisplayPipe } from './date-display.pipe';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AddJobsComponent } from './main/add-jobs/add-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    LandingComponent,
    UserComponent,
    InvestorComponent,
    FreelancerComponent,
    EntrepreneurComponent,
    MainComponent,
    NavbarComponent,
    InputFormInvestorComponent,
    InputFormFreelancerComponent,
    InputFormEntrepreneurComponent,
    ProfileComponent,
    JobsComponent,
    ViewComponent,
    ChatHomeComponent,
    DateDisplayPipe,
    AddJobsComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatStepperModule, 
    MatInputModule, 
    MatButtonModule,
    MatRadioModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    MatAutocompleteModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    DatePipe,
    FormsModule,
    MatToolbarModule,
    MatMenuModule
  ],
  providers: [
    RESTAPIService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

