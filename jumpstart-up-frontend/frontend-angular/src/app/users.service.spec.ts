// import { TestBed } from '@angular/core/testing';
// import { Firestore } from '@angular/fire/firestore';

// import { UsersService } from './users.service';

// describe('UsersService', () => {
//   let service: UsersService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [Firestore],
//     });
//     service = TestBed.inject(UsersService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { ProfileUser } from '../app/model/user-profile';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('UsersService', () => {
  let service: UsersService;
  let authServiceMock: Partial<AuthenticationService>;
  let firestoreMock: Firestore;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(() => {
    authServiceMock = {
      currentUser$: of(null),
    };
    const firestoreMock = {
      collection: jasmine.createSpy().and.returnValue(''),
      doc: jasmine.createSpy().and.returnValue('')
    } as unknown as Firestore;
    
    

    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: Firestore, useValue: firestoreMock },
      ],
      imports: [AngularFireModule.initializeApp(environment.firebase),]
    });

    service = TestBed.inject(UsersService);
  });

  it('should return the current user profile', (done) => {
    const profileUser: ProfileUser = {
      uid: 'abc123',
      displayName: 'John Doe',
      photoURL: 'https://www.example.com/johndoe.jpg',
    };


    service.currentUserProfile$.subscribe((result) => {
      expect(result).toEqual(null);
      done();
    });
  });
});
