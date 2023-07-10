import { NAVBARBACKGROUND, Colors } from '@models/colors.model';
import { BoardsService } from './../../../../services/boards.service';
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
export class NavbarComponent implements OnInit {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoards = false;

  user$= this.authService.user$;
  avatar= '/assets/svg/no-avatar.png';
  bgColor: Colors = 'sky';
  background = NAVBARBACKGROUND

  constructor(
    private authService: AuthService,
    private router: Router,
    private boardsService : BoardsService,
    private tokenService : TokenService
  ) {}

  ngOnInit(): void {
    this.boardsService.backgroundColor$.subscribe(color => this.bgColor = color);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  close(event: boolean){
    this.isOpenOverlayCreateBoards = event;
  }

  get colors(){
    const classes = this.background[this.bgColor];
    return classes ? classes : {};
  }

}
