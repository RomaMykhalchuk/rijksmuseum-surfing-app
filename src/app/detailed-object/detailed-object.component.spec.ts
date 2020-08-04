import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedObjectComponent } from './detailed-object.component';

describe('DetailedObjectComponent', () => {
  let component: DetailedObjectComponent;
  let fixture: ComponentFixture<DetailedObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
