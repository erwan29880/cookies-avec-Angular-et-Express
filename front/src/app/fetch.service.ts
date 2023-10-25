import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modele, PostModele} from './modele';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) {}

  checkSession() {
    const url = "http://localhost/48a6603f-e740-47dc-b63b-964a1cf80d8b";
    return this.http.get<Modele>(url, {withCredentials: true});
  }

  login(data: PostModele) {
    const url = "http://localhost/6b703c31-4fb5-4649-aa48-48691688476e";
    return this.http.post<Modele>(url, data, {withCredentials: true});
  }

  logout() {
    const url = "http://localhost/b7c4007a-23fb-429d-88e6-c10b64da3de7";
    return this.http.get<Modele>(url, {withCredentials: true});
  }
}
