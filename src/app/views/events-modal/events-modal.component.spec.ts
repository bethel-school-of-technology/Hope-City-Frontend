import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsModalComponent } from './events-modal.component';

describe('EventsModalComponent', () => {
  let component: EventsModalComponent;
  let fixture: ComponentFixture<EventsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
