import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userAuthorized = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.userAuthorized = this.authService.getAuth();
    this.authListenerSubs = this.authService
    .getStatusListener()
    .subscribe((isAuthorized => {
      this.userAuthorized = isAuthorized;
    }));
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
