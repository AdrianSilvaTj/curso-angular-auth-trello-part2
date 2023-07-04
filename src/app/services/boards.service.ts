import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  apiUrl = environment.API_URL;
  bufferSpace = 65535;

  constructor(
    private http: HttpClient,
  ) { }

  getBoard(id: Board['id']){
    return this.http.get<Board>(`${this.apiUrl}/boards/${id}`, {context: checkToken()})
  }

  /* Esta función obtiene la posición de la tarjeta que se esta moviendo, esta se ejecuta luego de moverse la tarjeta */
  getPosition(cards: Card[], currentIndex:number) {
    // si la cantidad de elementos es 1 es porque estaba vacia anteriormente, es nuevo el elemento,
    // por lo que su posicion sera la misma que el bufferSpace
    if (cards.length === 1){
      return this.bufferSpace;
    }
    // si tiene mas de un elemento y su indice es 0 se movio al tope, por lo que se toma la posicion
    // del elemento que estaba en el tope y se divide entre 2.
    if (cards.length > 1 && currentIndex === 0){
      const onTopPosition = cards[1].position
      return onTopPosition / 2;
    }
    // si tiene mas de dos elementos, su indice es mayor a 0 y menor al ultimo, se esta agregando en el medio,
    // se toma la posicion del elemento anterior y del proximo y se divide entre dos
    const lastIndex = cards.length - 1;
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex){
      const prevPosition = cards[currentIndex -1].position;
      const nextPosition = cards[currentIndex +1].position;
      return (prevPosition + nextPosition) / 2;
    }
    // si tiene mas de un elemento y su indice es igual al ultimo, se esta moviendo al fondo, se toma la posicion del ultimo,
    // y se le suma el buffer Space
    if (cards.length > 1 && currentIndex === lastIndex){
      const onBottomPosition = cards[lastIndex - 1].position
      return onBottomPosition + this.bufferSpace
    }
    return 0;
  }

}
