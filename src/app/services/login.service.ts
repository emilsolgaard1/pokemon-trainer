import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/app/environments/environment'
import { User } from '../models/user.model';


const { apiUsers,apiKey } = environment;

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private readonly http: HttpClient) { }

  /**
   * Get user with specific username, or create a new user with specific username if they don't exist.
   * @param username The username to check for.
   * @returns Observable of existing or newly created user.
   */
  public login(username:string): Observable<User> {
    return this.checkUsername(username)
    .pipe(
      switchMap((user: User|undefined)=>{
        if (user=== undefined) {
          return this.createUSer(username)
        }
        return of(user);
      })
    )
  }

  /**
   * Get user with specific username from the API.
   * @param username The username to check for.
   * @returns Observable of specific user, or undefined if user couldn't be found.
   */
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUsers}?username=${username}`)
      .pipe(
        // RxJS operatiors
        // If the user array empty pop will return undefined 
        map((response: User[]) => response.pop()
        )
      )
  }

  /**
   * Creates a new user and posts the user the API.
   * @param username Username of the new user.
   * @returns New posted user as Observable.
   */
  private createUSer(username:string):Observable<User>{
    const user={
      username,
      pokemon:[]
    }

    const headers = new HttpHeaders({
      "content-type":"application/json",
      "x-api-key":apiKey
    })

    return this.http.post<User>(apiUsers,user,{headers})
  }
}
