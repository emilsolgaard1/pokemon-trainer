import { Injectable } from '@angular/core';
import { StorageKeys } from '../consts/storage-key.enum';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User | undefined;

  get user(): User | undefined { return this._user }
  set user(user: User | undefined) {
    // Set user locally and in session storage.
    // Explanation mark means this should never be undefined
    StorageUtil.storageSave<User>(StorageKeys.User, user!)
    this._user = user
  }

  constructor() {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User)

  }

  /** 
   * Check if pokemon is contained in user's collections.
   * @param pokemonName Name of the pokemon to check for.
   * @returns true if pokemon is in collection, else returns false.
  */
  public inCollection(pokemonName: string): boolean {
    if (this._user) {
      return Boolean(this.user?.pokemon.find((pokemon: Pokemon) => pokemon.name === pokemonName))
    }
    return false;
  }

  /**
   * Adds specific pokemon to user's collection.
   * @param pokemon Pokemon object to add.
   */
  public addToCollection(pokemon: Pokemon): void {
    if (this._user) {
       this._user.pokemon.push(pokemon)   
    }
  }
  /**
   * Remove specific pokemon from user's collection.
   * @param pokemonName Name of pokemon to remove.
   */
  public removeFromCollection(pokemonName: string): void {
   if (this._user) {
      this._user.pokemon = this._user?.pokemon.filter((pokemon:Pokemon)=> pokemon.name!==pokemonName)    
   }

  }
}
