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
    //Explanation mark means this should never be undefines    
    StorageUtil.storageSave<User>(StorageKeys.User, user!)
    this._user = user
  }

  constructor() {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User)

  }

  public inCollection(pokemonName: string): boolean {
    if (this._user) {
      return Boolean(this.user?.pokemon.find((pokemon: Pokemon) => pokemon.name === pokemonName))
    }
    return false;
  }

  public addToCollection(pokemon: Pokemon): void {
    if (this._user) {
       this._user.pokemon.push(pokemon)   
    }
  }
  public removeFromCollection(pokemonName: string): void {
   if (this._user) {
      this._user.pokemon = this._user?.pokemon.filter((pokemon:Pokemon)=> pokemon.name!==pokemonName)    
   }

  }
}
