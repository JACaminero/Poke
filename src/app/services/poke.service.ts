import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Favorito } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  constructor(private http: HttpClient) { }

  getPokeInfo(url: string): any {
    return this.http.get<any>(`${url}`);
  }
  
  getPokes(url?: string): any {
    return this.http.get<any>(url == null ? `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`: url);
  }

  getFavs(): Favorito[] {
    var favs: Favorito[] = []
    let keys = Object.keys(localStorage)
    let i = keys.length;

    while ( i-- ) {
      favs.push( <Favorito>JSON.parse(localStorage.getItem(keys[i])) );
    }

    return favs 
  }
}
