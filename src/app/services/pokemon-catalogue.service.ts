import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.utils';

const { apiPokemons } = environment

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {
  private _pkemons: Pokemon[] = []
  private _error: string = ""
  private _loading: boolean = false

  get pokemons(): Pokemon[] { return this._pkemons }
  get error(): string { return this._error }
  get loading(): boolean { return this._loading }

  constructor(private readonly http: HttpClient) { }

  /**
   * Requests pokemon from PokemonAPI, but uses session storage if available.
   * @param forceCheckApi If true: disregard session storage and force check API instead.
   */
  public findAllPokemons(forceCheckApi = false): void {
    if(this._pkemons.length>0|| this.loading)
    {
      return
    }
    
    // use pokemon-catalogue in storage if possible
    const storedPokemons = StorageUtil.storageRead<Pokemon[]>("pokemon-catalogue")
    if(!forceCheckApi && storedPokemons !== undefined) {
        //console.log("stored pokemons")
        this._pkemons = storedPokemons
        return
    }

    this._loading = true
    // User type any cause Pokemon API returns an object not an array
    this.http.get<any>(apiPokemons)
      .pipe(
        finalize(() => {
          this._loading = false
        })
      )
      .subscribe(
        {
          next: (data) => {
            const pokemons:Pokemon[] = data.results  
            pokemons.map(item=>{
              let urlArray=item.url.split('/')
              let id=urlArray[urlArray.length-2]
              item.image=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`            
            })

            this._pkemons = pokemons
            StorageUtil.storageSave<Pokemon[]>("pokemon-catalogue", pokemons)
          },
          error: (error: HttpErrorResponse) => { this._error = error.message }
        }
      )
  }
 
  /**
   * Get specific pokemon from catalogue.
   * @param name Name of the pokemon to get.
   * @returns Pokemon object, or undefined if pokemon can't be found.
   */
  public pokemonByName(name:string): Pokemon | undefined
  {
    return this._pkemons.find((pokemon:Pokemon)=>pokemon.name===name)
  } 
}
