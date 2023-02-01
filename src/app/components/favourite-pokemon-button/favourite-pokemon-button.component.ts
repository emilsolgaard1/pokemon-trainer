import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavouriteService } from 'src/app/services/favourite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourite-pokemon-button',
  templateUrl: './favourite-pokemon-button.component.html',
  styleUrls: ['./favourite-pokemon-button.component.css']
})
export class FavouritePokemonButtonComponent implements OnInit {

  public isFavourite: boolean = false
  public loading: boolean = false

  @Input() pokemonName: string = ""

  constructor(
    private readonly userService: UserService,
    private readonly favouriteService: FavouriteService
  ) { }

  ngOnInit(): void {
    this.isFavourite = this.userService.inCollection(this.pokemonName)
  }

  onFavouriteClick(): void {
    this.loading = true
    this.favouriteService.addToFavorites(this.pokemonName).subscribe({
      next: (updatedUser: User) => {
        this.loading = false
        this.isFavourite = this.userService.inCollection(this.pokemonName)
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message)
      }
    })    
  }
}
