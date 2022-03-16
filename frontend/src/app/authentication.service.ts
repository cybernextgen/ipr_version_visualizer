import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from './models/user'
import { ToastService } from './toast.service'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>
    public user: Observable<User>
    jsonHeaders = new HttpHeaders().set("Content-Type", "application/json")

    constructor(
        private router: Router,
        private http: HttpClient,
        private toastService: ToastService
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'))
        this.user = this.userSubject.asObservable()
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<User>(`/api/login/`, { username, password }, {headers: this.jsonHeaders})
            .pipe(map((user) => {
                user.authdata = window.btoa(username + ':' + password)
                localStorage.setItem('user', JSON.stringify(user))
                this.userSubject.next(user)
                this.toastService.showSuccess('Выполнен вход в систему!')
                return user
            }))
    }

    logout() {
        localStorage.removeItem('user')
        this.userSubject.next(new User())
        // this.http.get<any>(`/api/logout/`).subscribe(()=>{
        this.toastService.showSuccess('Выполнен выход из системы!')
        // })
    }
}