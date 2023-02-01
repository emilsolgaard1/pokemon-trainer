import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.utils';

const { pokemonsApiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {
  private _pkemons: Pokemon[] = []
  // private _pokemons_1:Pokemon[]|undefined
  private _error: string = ""
  private _loading: boolean = false

  // get pokemons_1(): Pokemon|undefined { 
  //   return this._pokemons_1  }
  get pokemons(): Pokemon[] { return this._pkemons }
  get error(): string { return this._error }
  get loading(): boolean { return this._loading }

  constructor(private readonly http: HttpClient) { }

  public findAllPokemons(forceApi = false): void {
    if(this._pkemons.length>0|| this.loading)
    {
      return
    }
    
    // use pokemon-catalogue in storage if possible
    const storedPokemons = StorageUtil.storageRead<Pokemon[]>("pokemon-catalogue")
    if(!forceApi && storedPokemons !== undefined) {
        //console.log("stored pokemons")
        this._pkemons = storedPokemons
        return
    }

    this._loading = true
    // User type any cause Pokemon API returns an object not an array
    this.http.get<any>(pokemonsApiUrl)
      .pipe(
        finalize(() => {
          this._loading = false
        })
      )
      .subscribe(
        {
          next: (data) => {
            //console.log("request") // TESTING
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
 
  public pokemonByName(name:string): Pokemon | undefined
  {
    return this._pkemons.find((pokemon:Pokemon)=>pokemon.name===name)
  } 
}
