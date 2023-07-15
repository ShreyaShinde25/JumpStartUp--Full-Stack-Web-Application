import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { UsersService } from './users.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { ChatsService } from './chats.service';

describe('ChatsService', () => {
  let service: ChatsService;
  let firestoreMock: any;
  let usersServiceMock: any;
   
    beforeEach(() => {
      firestoreMock = jasmine.createSpyObj('Firestore', ['collection', 'doc']);
      usersServiceMock = jasmine.createSpyObj('UsersService', ['get currentUserProfile$']);
      TestBed.configureTestingModule({
        providers: [
          ChatsService,
          { provide: Firestore, useValue: firestoreMock },
          { provide: UsersService, useValue: usersServiceMock }
        ],
        imports:[AngularFireModule.initializeApp(environment.firebase)]
      });
      service = TestBed.inject(ChatsService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
    
  });