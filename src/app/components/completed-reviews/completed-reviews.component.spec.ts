import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedReviewsComponent } from './completed-reviews.component';

describe('CompletedReviewsComponent', () => {
  let component: CompletedReviewsComponent;
  let fixture: ComponentFixture<CompletedReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
