import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [NgClass, CommonModule, FormsModule, ReactiveFormsModule]
})
export class Login {
  submitted = false;
  loginForm: FormGroup;
  error: string | null = '';
  constructor(private authService: Auth,
    private router: Router,) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    const { username, password } = form.value;
    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.error = err.error.message || 'Login failed!';
      },
    });
  }
}
