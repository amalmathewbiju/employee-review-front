import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/reviews`);
  }

  getPendingReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/reviews/pending`);
  }

  getCompletedReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/reviews/completed`);
  }

  createReview(review: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/reviews`, review);
  }

  submitFeedback(reviewId: string, data: { feedback: string; rating: number }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/reviews/${reviewId}/feedback`, data);
  }

  getReviewById(id: string): Observable<Review> {
    return this.http.get<Review>(`${environment.apiUrl}/reviews/${id}`);
  }

  getReviewStatistics(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/reviews/stats`);
  }
}
