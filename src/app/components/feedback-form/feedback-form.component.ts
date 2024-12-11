import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-feedback-form',
  standalone:false,
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  review: Review | null = null;
  reviewId: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.feedbackForm = this.fb.group({
      feedback: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit() {
    this.reviewId = this.route.snapshot.params['id'];
    this.loadReview();
  }

  loadReview() {
    this.reviewService.getReviewById(this.reviewId).subscribe({
      next: (review) => {
        this.review = review;
        console.log('Loaded review:', review);
      },
      error: (error) => {
        console.error('Error loading review:', error);
      }
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.loading = true;
      const feedbackData = {
        feedback: this.feedbackForm.get('feedback')?.value,
        rating: this.feedbackForm.get('rating')?.value
      };

      console.log('Submitting feedback:', feedbackData);

      this.reviewService.submitFeedback(this.reviewId, feedbackData).subscribe({
        next: (response) => {
          console.log('Feedback submitted successfully:', response);
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error submitting feedback:', error);
          this.loading = false;
        }
      });
    }
  }
}
