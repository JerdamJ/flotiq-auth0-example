import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CONFIG } from '../../config/config';
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
        return this.http.get(`${CONFIG.flotiqApiUrl}/content/todolist`, {
          headers: new HttpHeaders({'X-AUTH-TOKEN': CONFIG.flotiqApiKey}),
          params: new HttpParams().set('filters', `{"email":{"type":"contains","filter": "${user.email}"}}`)
        });
      })
    );

  }

  addItem(data) {
    return this.auth.getUser$().pipe(
      take(1),
      switchMap(user => {
        return this.http.post(`${CONFIG.flotiqApiUrl}/content/todolist`, {...data, user: user.sub, email: user.email}, {
          headers: new HttpHeaders({'X-AUTH-TOKEN': CONFIG.flotiqApiKey})
        });
      })
    );
  }

  getItem(id: string) {
    return this.auth.getUser$().pipe(
      take(1),
      switchMap(user => {
        return this.http.get<Todolist>(`${CONFIG.flotiqApiUrl}/content/todolist/${id}`, {
          headers: new HttpHeaders({'X-AUTH-TOKEN': CONFIG.flotiqApiKey})
        });
      })
    );
  }


  deleteItem(id: string) {
    return this.auth.getUser$().pipe(
      take(1),
      switchMap(user => {
        return this.http.delete(`${CONFIG.flotiqApiUrl}/content/todolist/${id}`, {
          headers: new HttpHeaders({'X-AUTH-TOKEN': CONFIG.flotiqApiKey}),
        });
      })
    );
  }

  updateItem(data, id: string){
    return this.auth.getUser$().pipe(
      take(1),
      switchMap(user => {
        return this.http.put(`${CONFIG.flotiqApiUrl}/content/todolist/${id}`, {...data, user: user.sub, email: user.email}, {
          headers: new HttpHeaders({'X-AUTH-TOKEN': CONFIG.flotiqApiKey}),
        });
      })
    );
  }
}
