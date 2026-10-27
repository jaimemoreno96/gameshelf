import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GsAutocomplete } from './gs-autocomplete';

describe('GsAutocomplete', () => {
  let component: GsAutocomplete;
  let fixture: ComponentFixture<GsAutocomplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GsAutocomplete],
    }).compileComponents();

    fixture = TestBed.createComponent(GsAutocomplete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
