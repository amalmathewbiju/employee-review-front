import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-review-list',
  standalone: false,
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviews: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  isReviewer(review: any): boolean {
    return review.reviewer._id === this.authService.getCurrentUser()?._id;
  }
  
  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getReviews().subscribe(
      reviews => this.reviews = reviews,
      error => console.error('Error loading reviews:', error)
    );
  }
}
