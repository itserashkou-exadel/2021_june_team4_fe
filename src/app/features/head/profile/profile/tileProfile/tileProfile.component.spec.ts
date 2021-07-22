import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileProfileComponent } from './tileProfile.component';

describe('TileProfileComponent', () => {
  let component: TileProfileComponent;
  let fixture: ComponentFixture<TileProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
