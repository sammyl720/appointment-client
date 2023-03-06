import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSubscribtionButtonComponent } from './email-subscribtion-button.component';

describe('EmailSubscribtionButtonComponent', () => {
  let component: EmailSubscribtionButtonComponent;
  let fixture: ComponentFixture<EmailSubscribtionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSubscribtionButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSubscribtionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
