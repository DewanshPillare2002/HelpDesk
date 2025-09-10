import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackComponent } from './feedback.component';

// Group of testcases are given inside describe
describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
``// beforeEach() is exectued before every testcase is executed
// async() --> It is an asynchronous operation..
  beforeEach(async () => {
    //await -  waits till operation is completed
    await TestBed.configureTestingModule({
      declarations: [FeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it - it stands for individual tests or defining new testcases
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
