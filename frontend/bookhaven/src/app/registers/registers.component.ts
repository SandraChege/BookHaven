import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css'],
})
export class RegistersComponent {
  registrationForm!: FormGroup;
  showSuccessMessage = false;
  showErrorMessage = false;

  constructor( private formBuilder: FormBuilder, private router: Router, private register: RegisterService) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      phone_no:['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  registerNewUser() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm);
      this.register.registerNewUser(this.registrationForm.value).then(() => {
        //Show success message
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['login']);
        }, 3000);
      });
    }
  }
}
