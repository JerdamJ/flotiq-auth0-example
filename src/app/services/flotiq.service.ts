import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { take, switchMap } from 'rxjs/operators';
import { Todolist } from '../models/todolist.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlotiqService {

  itemAdded = new Subject<Todolist>();
  itemChanged = new Subject<Todolist>();
  itemRemoved = new Subject<string>();

  constructor(private http: HttpClient, private auth: AuthService) { }

  listItems() {
    return this.auth.getUser$().pipe(
      take(1),
      switchMap(user => {
        return this.http.get(`${environment.flotiqApiUrl}/content/todolist`, {
          headers: new HttpHeaders({'X-AUTH-TOKEN': environment.flotiqApiKey}),
          params: new HttpParams().set('filters', `{"user":{"type":"contains","filter": "${user.sub}"}}`)
        });
      })
    );

  }

  addItem(data) {
    return this.auth.getUser$().pipe(
      take(1),
      switchMap(user => {
        console.log(user);
        return this.http.post(`${environment.flotiqApiUrl}/content/todolist`, {...data, user: user.sub}, {
          headers: new HttpHeaders({'X-AUTH-TOKEN': environment.flotiqApiKey})
        });
      })
    );
  }

  getItem(id: string) {
    return this.auth.getUser$().pipe(
      take(1),
      switchMap(user => {
        return this.http.get<Todolist>(`${environment.flotiqApiUrl}/content/todolist/${id}`, {
          headers: new HttpHeaders({'X-AUTH-TOKEN': environment.flotiqApiKey})
        });
      })
    );
  }


  deleteItem(id: string) {
    return this.auth.getUser$().pipe(
      take(1),
      switchMap(user => {
        return this.http.delete(`${environment.flotiqApiUrl}/content/todolist/${id}`, {
          headers: new HttpHeaders({'X-AUTH-TOKEN': environment.flotiqApiKey}),
        });
      })
    );
  }

  updateItem(data, id: string){
    return this.auth.getUser$().pipe(
      take(1),
      switchMap(user => {
        return this.http.put(`${environment.flotiqApiUrl}/content/todolist/${id}`, {...data, user: user.sub}, {
          headers: new HttpHeaders({'X-AUTH-TOKEN': environment.flotiqApiKey}),
        });
      })
    );
  }
}
