import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false;
  pendingReviews: Review[] = [];
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.currentUser = this.authService.getCurrentUser(); 
    this.loadPendingReviews();
  }

  loadPendingReviews() {
    this.reviewService.getPendingReviews().subscribe({
      next: (reviews) => {
        this.pendingReviews = reviews;
      }
    });
  }
}
