import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { ReviewCreateComponent } from './components/review-create/review-create.component';
import { CompletedReviewsComponent } from './components/completed-reviews/completed-reviews.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },{
    path: 'reviews/create',
    component: ReviewCreateComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees', 
    component: EmployeeListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'reviews', 
    component: ReviewListComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: 'reviews/:id',
    component: FeedbackFormComponent,
    canActivate: [AuthGuard]
  },{
    path: 'complete',
    component: CompletedReviewsComponent,
    canActivate: [AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
