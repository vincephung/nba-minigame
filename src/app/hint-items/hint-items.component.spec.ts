import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintItemsComponent } from './hint-items.component';

describe('HintItemsComponent', () => {
  let component: HintItemsComponent;
  let fixture: ComponentFixture<HintItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HintItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HintItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
