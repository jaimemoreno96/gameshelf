import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BacklogColumn } from './backlog-column';

describe('BacklogColumn', () => {
  let component: BacklogColumn;
  let fixture: ComponentFixture<BacklogColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogColumn],
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogColumn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
