import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCreateBpComponent } from './step-create-bp.component';

describe('StepCreateBpComponent', () => {
  let component: StepCreateBpComponent;
  let fixture: ComponentFixture<StepCreateBpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepCreateBpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepCreateBpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
