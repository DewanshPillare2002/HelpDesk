import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotpageComponent } from './slotpage.component';

describe('SlotpageComponent', () => {
  let component: SlotpageComponent;
  let fixture: ComponentFixture<SlotpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlotpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
