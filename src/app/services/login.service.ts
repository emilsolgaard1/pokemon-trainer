import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment'
import { User } from '../models/user.model';


const { trainerApiUrl,trainerApiKey } = environment;

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private readonly http: HttpClient) { }

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

  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${trainerApiUrl}?username=${username}`)
      .pipe(
        //RxJS operatiors
        // If the user array empty pop will return undefined 
        map((response: User[]) => response.pop()
        )
      )
  }

  private createUSer(username:string):Observable<User>{
    const user={
      username,
      pokemon:[]
    }

    const headers = new HttpHeaders({
      "content-type":"application/json",
      "x-api-key":trainerApiKey
    })

    return this.http.post<User>(trainerApiUrl,user,{headers})
  }
}
