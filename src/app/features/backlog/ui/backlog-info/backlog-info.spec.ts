import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BacklogInfo } from './backlog-info';

describe('BacklogInfo', () => {
  let component: BacklogInfo;
  let fixture: ComponentFixture<BacklogInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
