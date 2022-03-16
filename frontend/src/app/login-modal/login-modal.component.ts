import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  errors = ''

  constructor(
    private activeModal: NgbActiveModal,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }

  submit(): void {
    if (this.loginForm.invalid) {
      return
    }
    this.loading = true
    this.authenticationService.login(this.f['username'].value, this.f['password'].value).subscribe({
      next: () => {
        this.activeModal.close()
      },
      error: () => {
        this.errors = 'Ошибка входа! Неверный логин или пароль.'
        this.loading = false
      }
    })
  }

  close(): void {
    this.activeModal.dismiss('Modal Closed');
  } 

}
