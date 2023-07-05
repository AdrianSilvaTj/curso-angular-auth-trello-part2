import { TokenService } from '@services/token.service';
import { AuthService } from '@services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { User } from '@models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent{
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoards = false;

  user$= this.authService.user$;
  avatar= '/assets/svg/no-avatar.png'

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService : TokenService
  ) {}

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  close(event: boolean){
    this.isOpenOverlayCreateBoards = event;
  }

}
