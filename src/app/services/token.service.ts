import { Injectable } from '@angular/core';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  // trabajamos el token del usuario en las cookies

  saveToken(token: string){
    setCookie('token-trello', token, { expires: 365, path: '/' });
  }

  getToken(){
    return getCookie('token-trello');
  }

  removeToken(){
    removeCookie('token-trello');
  }

}
