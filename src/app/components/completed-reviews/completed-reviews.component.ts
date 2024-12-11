import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-completed-reviews',
  standalone: false,
  
  templateUrl: './completed-reviews.component.html',
  styleUrl: './completed-reviews.component.css'
})
export class CompletedReviewsComponent implements OnInit {
  completedReviews: any[] = [];
  loading = false;

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.loading = true;
    this.reviewService.getCompletedReviews().subscribe({
      next: (reviews) => {
        console.log('Completed reviews:', reviews);
        this.completedReviews = reviews;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.loading = false;
      }
    });
  }
}
