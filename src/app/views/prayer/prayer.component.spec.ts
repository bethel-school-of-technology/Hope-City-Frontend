import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerComponent } from './prayer.component';

describe('PrayerComponent', () => {
  let component: PrayerComponent;
  let fixture: ComponentFixture<PrayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
