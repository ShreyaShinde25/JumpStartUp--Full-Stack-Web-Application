import { TestBed } from '@angular/core/testing';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserInfo,
} from '@angular/fire/auth';
import { of } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let mockAuth: any;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: Auth, useValue: mockAuth },
      ],
      imports:[ ]
    });
    authService = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});


