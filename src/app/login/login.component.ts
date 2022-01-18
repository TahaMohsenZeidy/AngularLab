import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userData: any
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private afAuth: AngularFireAuth
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
        } else {
          localStorage.setItem('user', "null");
        }
      })
  
  
    }
  

  ngOnInit(): void {}

  tryGoogleLogin(): void {
    this.authService
      .doGoogleLogin()
      .then(() => this.successRedirect())
      .catch((error) => console.log(error));
  }

  successRedirect(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.ngZone.run(() => this.router.navigate(['/dashboard']).then(() => window.location.reload()));
  }
}
