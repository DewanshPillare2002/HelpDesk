import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // Import your service
 
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  parkingHeroBg = 'parking2.jpg';
  loginForm: FormGroup;
  message: string = '';
 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService // Inject the service
  ) {
    this.loginForm = this.fb.group({
      role: ['', Validators.required],
      name: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
 
  login() {
    if (this.loginForm.invalid) {
      this.message = 'Please fill in all required fields correctly.';
      return;
    }
 
    const name = this.loginForm.get('name')?.value;
    const password = this.loginForm.get('password')?.value;
    const role = this.loginForm.get('role')?.value;
 
    this.http.get<any[]>('http://localhost:3000/User').subscribe({
      next: (users) => {
        const user = users.find(u => u.name === name);
 
        if (!user) {
          this.message = 'Not a registered Username';
        } else if (user.password !== password) {
          this.message = 'Invalid Password';
        } else if (user.role !== role) {
          this.message = 'Invalid Role';
        } else {
          // Share user id and name using the service
          this.userService.setUser({ id: user.id, name: user.name });
 
          // Navigate based on role
          if (user.role === 'Admin') {
            this.router.navigate(['/adminScreen']);
          } else if (user.role === 'Staff') {
            this.router.navigate(['/StaffHome']);
          } else if (user.role === 'Customer') {
            this.router.navigate(['/slotpage']);
          }
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.message = 'Server error. Please try again later.';
      }
    });
  }
}
 