import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modele, PostModele} from './modele';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) {}

  checkSession() {
    const url = "http://localhost:80/checkSession";
    return this.http.get<Modele>(url, {withCredentials: true});
  }

  login(data: PostModele) {
    const url = "http://localhost:80/auth";
    return this.http.post<Modele>(url, data, {withCredentials: true});
  }

  logout() {
    const url = "http://localhost:80/logout";
    return this.http.get<Modele>(url, {withCredentials: true});
  }
}
