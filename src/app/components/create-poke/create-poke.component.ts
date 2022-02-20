import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Favorito } from 'src/app/models/models';
import { Notifier } from '../poke-list/poke-list.component';

@Component({
  selector: 'app-create-poke',
  templateUrl: './create-poke.component.html',
  styleUrls: ['./create-poke.component.css']
})
export class CreatePokeComponent implements OnInit {

  constructor() { }

  @Input() pokeFav = new Notifier();

  pokeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    alias: new FormControl('', [Validators.required]),
    createdAt: new FormControl(''),
  });

  ngOnInit(): void {           
    this.pokeFav.valueChanged = (d: string) => { this.pokeForm.controls.name.setValue(d) }
  }

  submit() {
    let fav = new Favorito()
    fav.name = this.pokeForm.controls.name.value
    fav.alias = this.pokeForm.controls.alias.value

    if (localStorage.getItem(fav.alias) != null) { // si encuentra este alias en localstorage entonces ya existe este alias
      alert('Este alias ya existe en base de datos.')
      return
    }
    localStorage.setItem(fav.alias, JSON.stringify(fav)); //el mismo alias es usado como llave para guardar en local storage 
    alert('Operacion Exitosa.')
  }
}