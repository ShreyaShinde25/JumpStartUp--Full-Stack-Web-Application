// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { UsersService } from '../users.service';

// import { ChatHomeComponent } from './chat-home.component';

// describe('ChatHomeComponent', () => {
//   let component: ChatHomeComponent;
//   let fixture: ComponentFixture<ChatHomeComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [UsersService],
//       declarations: [ ChatHomeComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ChatHomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { combineLatest, of } from 'rxjs';
import { ChatsService } from '../chats.service';
import { Message } from '../model/chat';
import { ProfileUser } from '../model/user-profile';
import { UsersService } from '../users.service';
import { ChatHomeComponent } from './chat-home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatSelectionList } from '@angular/material/list';
import { Timestamp } from '@angular/fire/firestore';

describe('ChatHomeComponent', () => {
  let component: ChatHomeComponent;
  let fixture: ComponentFixture<ChatHomeComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let chatsServiceSpy: jasmine.SpyObj<ChatsService>;

  beforeEach(async () => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['currentUserProfile$', 'allUsers$']);
    chatsServiceSpy = jasmine.createSpyObj('ChatsService', ['myChats$', 'getChatMessages$', 'isExistingChat', 'createChat', 'addChatMessage']);

    await TestBed.configureTestingModule({
      declarations: [ChatHomeComponent,MatDivider,MatIcon,MatAutocomplete, MatSelectionList],
      imports: [ReactiveFormsModule,MatFormFieldModule,MatAutocompleteModule],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: ChatsService, useValue: chatsServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create a chat with user', () => {
  //   const user: ProfileUser = { uid: '123', email: 'test@test.com', displayName: 'Test User' };
  //   const chatId = 'abc';

  //   usersServiceSpy.currentUserProfile$ = of(user);
  //   usersServiceSpy.allUsers$ = of([user]);

  //   chatsServiceSpy.isExistingChat.and.returnValue(of(null));
  //   chatsServiceSpy.createChat.and.returnValue(of(chatId));

  //   component.createChat(user);

  //   expect(chatsServiceSpy.createChat).toHaveBeenCalledWith(user);
  //   expect(component.chatListControl.value).toEqual([chatId]);
  // });

  // it('should not create a chat with user if it already exists', () => {
  //   const user: ProfileUser = { uid: '123', email: 'test@test.com', displayName: 'Test User' };
  //   const chatId = 'abc';

  //   usersServiceSpy.currentUserProfile$ = of(user);
  //   usersServiceSpy.allUsers$ = of([user]);

  //   chatsServiceSpy.isExistingChat.and.returnValue(of(chatId));

  //   component.createChat(user);

  //   expect(chatsServiceSpy.createChat).not.toHaveBeenCalled();
  //   expect(component.chatListControl.value).toEqual([chatId]);
  // });


  describe('ngOnInit', () => {
  
  it('should send message to selected chat', () => {
    const message = 'Hello World!';
    const selectedChatId = 'abc';

    component.messageControl.setValue(message);
    component.chatListControl.setValue([selectedChatId]);

    chatsServiceSpy.addChatMessage.and.returnValue(of(null));

    component.sendMessage();

    expect(chatsServiceSpy.addChatMessage).toHaveBeenCalledWith(selectedChatId, message);
  });

  it('should not send message if message or chat is not selected', () => {
    const message = '';
    const selectedChatId = '';

    component.messageControl.setValue(message);
    component.chatListControl.setValue(selectedChatId);

    chatsServiceSpy.addChatMessage.and.returnValue(of(null));

    component.sendMessage();

    expect(chatsServiceSpy.addChatMessage).not.toHaveBeenCalled();
  });
});


});