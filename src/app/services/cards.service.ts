import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';
import { Card, UpdateCardDto } from '@models/card.model';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) { }

  update(id: Card['id'], changes: UpdateCardDto){
    return this.http.put<Card>(`${this.apiUrl}/cards/${id}`, changes, {context: checkToken()})
  }

}
