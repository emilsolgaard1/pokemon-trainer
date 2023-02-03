import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent {

  public isFavourite: boolean = false
  public nowFavourite: boolean = false

  @Input() pokemon?:Pokemon

  constructor(
    private readonly userService: UserService
  ){}

  ngOnInit(): void {
    this.isFavourite = this.userService.inCollection(this.pokemon!.name)
  }

  handleFavourite(isFavourite:boolean) {
    this.isFavourite = isFavourite
    this.nowFavourite = true
  }
}
