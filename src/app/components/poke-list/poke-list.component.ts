import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PokeService } from 'src/app/services/poke.service';
import { Favorito, Pokemon } from 'src/app/models/models'

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {

  constructor(public pk: PokeService) { }

  nextUrl: string; 
  prevUrl: string; 
  showList = new Array<Pokemon>()

  ngOnInit(): void {
    this.showList = this.fillList()
  }

  notifyObj = new Notifier();
  select(name: string) {
    return this.notifyObj.valueChanged(name)
  }

  paginatePrev() {
    this.showList = this.fillList(this.prevUrl);
  }
  
  paginateNext() {    
    this.showList = this.fillList(this.nextUrl);
  }
  
  fillList(url?: string): Pokemon[] {
    let pokeList = new Array<Pokemon>()

    this.pk.getPokes(url).subscribe(p => {
      
      this.nextUrl = p.next  
      this.prevUrl = p.previous
      p.results.forEach(r => { //consigue info general de pokemon
        let pokemon: Pokemon = new Pokemon()
        pokemon.name = r.name

        this.pk.getPokeInfo(r.url).subscribe(poke => {//consigue info detallada de cada pokemon
          pokemon.abilities = poke.abilities
          pokemon.altura = poke.height
          pokemon.baseExperience = poke.base_experience
        })
        pokeList.push(pokemon)
      })
    })
    return pokeList
  }
}

export class Notifier {
  valueChanged: (data: string) => void = (d: string) => { }
}
