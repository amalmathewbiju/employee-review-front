import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  employeeForm: FormGroup;
  isEditing: boolean = false;
  selectedEmployee: any = null;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      employees => this.employees = employees,
      error => console.error('Error loading employees:', error)
    );
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.isEditing) {
        this.employeeService.updateEmployee(this.selectedEmployee._id, this.employeeForm.value)
          .subscribe(() => {
            this.loadEmployees();
            this.resetForm();
          });
      } else {
        this.employeeService.createEmployee(this.employeeForm.value)
          .subscribe(() => {
            this.loadEmployees();
            this.resetForm();
          });
      }
    }
  }

  editEmployee(employee: any) {
    this.isEditing = true;
    this.selectedEmployee = employee;
    this.employeeForm.patchValue({
      name: employee.name,
      email: employee.email
    });
    this.employeeForm.get('password')?.setValidators(null);
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => this.loadEmployees(),
        error => console.error('Error deleting employee:', error)
      );
    }
  }

  resetForm() {
    this.isEditing = false;
    this.selectedEmployee = null;
    this.employeeForm.reset();
    this.employeeForm.get('password')?.setValidators([Validators.required]);
  }
}