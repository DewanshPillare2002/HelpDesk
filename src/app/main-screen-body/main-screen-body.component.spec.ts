import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainScreenBodyComponent } from './main-screen-body.component';

describe('MainScreenBodyComponent', () => {
  let component: MainScreenBodyComponent;
  let fixture: ComponentFixture<MainScreenBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainScreenBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainScreenBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
