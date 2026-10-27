import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BacklogGameItem } from './backlog-game-item';

describe('BacklogGameItem', () => {
  let component: BacklogGameItem;
  let fixture: ComponentFixture<BacklogGameItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogGameItem],
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogGameItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
