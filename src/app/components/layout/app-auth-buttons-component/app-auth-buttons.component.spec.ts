import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAuthButtonsComponent } from './app-auth-buttons.component';

describe('AppAuthButtonsComponent', () => {
  let component: AppAuthButtonsComponent;
  let fixture: ComponentFixture<AppAuthButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAuthButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAuthButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
