import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/models/auth.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  auth:Auth;
  userAuthorized = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    //getting user and refreshing for component
    this.authService.getUser().subscribe((u) => {
      this.auth = u;
      this.userAuthorized = u != null;
    });
    this.authService.refetchUser();
    //subbing to subject boolean
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
