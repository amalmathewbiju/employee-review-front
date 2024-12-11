import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ReviewService } from '../../services/review.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-review-create',
  standalone:false,
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})
export class ReviewCreateComponent implements OnInit {
  reviewForm: FormGroup;
  employees: User[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private reviewService: ReviewService,
    private router: Router
  ) {
    this.reviewForm = this.fb.group({
      subject: ['', Validators.required],
      reviewer: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      }
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      this.loading = true;
      this.reviewService.createReview(this.reviewForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error creating review:', error);
          this.loading = false;
        }
      });
    }
  }
}
