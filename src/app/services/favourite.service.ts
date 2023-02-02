import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserService } from './user.service';

const{apiKey,apiUsers} = environment

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  
  constructor(
    private readonly http:HttpClient,
    private readonly pokemonCatalogueService:PokemonCatalogueService,
    private readonly userService:UserService
  ) { }

  /**
   * Add a pokemon with specific name from catalogue to the current user's collection.
   * @param pokemonName The specific name of pokemon to add.
   * @returns Observable of the user with updated collection.
   */
  public addToFavorites(pokemonName:string):Observable<User>{
    
    if(!this.userService.user)
    {
      throw new Error ("addToFavorites: There is no user")
    }
    const user:User=this.userService.user
    const pokemon: Pokemon | undefined = this.pokemonCatalogueService.pokemonByName(pokemonName)

    if(!pokemon)
    {
      throw new Error ("addToFavorites: No pokemon with name: "+pokemonName)
    }
    
    if(this.userService.inCollection(pokemonName))
    {
      this.userService.removeFromCollection(pokemonName)
    }else{
      this.userService.addToCollection(pokemon)
    }
    
    const headers = new HttpHeaders({
      "content-type":"application/json",
      "x-api-key":apiKey
    })

    return this.http.patch<User>(`${apiUsers}/${user.id}`,
    {pokemon:[...user.pokemon]},{headers}// Already updated.
    )
    .pipe(
      tap((updatedUser:User)=>{this.userService.user= updatedUser})
    )
    
  }
}
