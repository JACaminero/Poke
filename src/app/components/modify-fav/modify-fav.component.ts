import { Component, Input, OnInit } from '@angular/core';
import { PokeService } from 'src/app/services/poke.service';
import { Notifier } from '../poke-list/poke-list.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Favorito } from 'src/app/models/models';

@Component({
  selector: 'app-modify-fav',
  templateUrl: './modify-fav.component.html',
  styleUrls: ['./modify-fav.component.css', '.././poke-list/poke-list.component.css']
})
export class ModifyFavComponent implements OnInit {

  constructor(private pokeServ: PokeService) { }
  
  showList = []
  currentFav: Favorito = new Favorito()

  pokeForm = new FormGroup({
    name: new FormControl('' ),
    alias: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.currentFav.name = '' 
    this.showList = this.pokeServ.getFavs()
  }

  submit() {
    
    let fav = new Favorito()
    fav.name = this.pokeForm.controls.name.value
    fav.alias = this.pokeForm.controls.alias.value

    if(this.currentFav.alias == fav.alias) {
      alert('No ha hecho ningun cambio al alias.')
      return
    }

    localStorage.removeItem(this.currentFav.alias.toString()) //remueveme el actual
    this.showList = this.pokeServ.getFavs()

    if (localStorage.getItem(fav.alias) != null) { // si encuentra este alias en localstorage entonces ya existe este alias
      alert('Este alias ya existe en base de datos.')
      return
    }

    localStorage.setItem(fav.alias, `{"createdAt":"${new Date()}","name":"${fav.name}","alias":"${fav.alias}"}`) //el mismo alias es usado como llave para guardar en local storage 
    alert('Modificado Exitosamente.')
    this.showList = this.pokeServ.getFavs()

  } 

  select(name: string, alias: string) {
    this.currentFav.name = name
    this.currentFav.alias = alias

    this.pokeForm.controls.name.setValue(name)
    this.pokeForm.controls.alias.setValue(alias)
    this.showList = this.pokeServ.getFavs()

  }
}
