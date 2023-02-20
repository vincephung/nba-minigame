import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InitialHintsComponent } from './initial-hints.component';

describe('InitialHintsComponent', () => {
  let component: InitialHintsComponent;
  let fixture: ComponentFixture<InitialHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialHintsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InitialHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
