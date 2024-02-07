import { Component } from '@angular/core';
import { PokeapiService } from './../Services/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemonId: number | null = null;
  pokemonName: string = ''; 
  pokemonQuery: string = ''; 
  pokemon: any;
  pokemonByName: any;
  pokemonByQuery: any;

  constructor(private api: PokeapiService) {}

  getPokemonData() {
    try {
      if (this.pokemonId !== null) {
        this.api.getPokemonID(this.pokemonId).subscribe((response) => {
          this.pokemon = {
            name: response.name,
            imageUrl: response.sprites.front_default
          };
        });
      } else {
        console.log('ID de Pokémon no válido');
      }
    } catch (error) {
      console.log(error);
    }
  }

  getPokemonDataByName() {
    try {
      if (this.pokemonName) {
        this.api.getPokemonByName(this.pokemonName.toLowerCase()).subscribe((response) => {
          this.pokemonByName = {
            name: response.name,
            imageUrl: response.sprites.front_default,
            id: response.id
          };
        });
      } else {
        console.log('Nombre de Pokémon no válido');
      }
    } catch (error) {
      console.log(error);
    }
  }

  getPokemonDataByQuery() {
    try {
      if (this.pokemonQuery) {
        
        if (!isNaN(Number(this.pokemonQuery))) {
          const id = parseInt(this.pokemonQuery);
          this.api.getPokemonID(id).subscribe((response) => {
            this.pokemonByQuery = {
              name: response.name,
              imageUrl: response.sprites.front_default,
              id: response.id
            };
          });
        } else { 
          this.api.getPokemonByName(this.pokemonQuery.toLowerCase()).subscribe((response) => {
            this.pokemonByQuery = {
              name: response.name,
              imageUrl: response.sprites.front_default,
              id: response.id
            };
          });
        }
      } else {
        console.log('Consulta de Pokémon no válida');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
