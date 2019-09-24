import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  newClient$ = new BehaviorSubject<Client>(null); // Always use $ for observable
  editClient$ = new BehaviorSubject<Client>(null);
  deleteClient$ = new BehaviorSubject<string>(null);

  private url = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + 'clients/' + id);
  }

  editClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.url + 'clients/' + client.id, client);
  }

  getClient(id: string) {
    return this.http.get<Client>(this.url + 'clients/' + id);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + 'clients');
  }

  save(client: Client): Observable<Client> {
    return this.http.post<Client>(this.url + 'clients', client);
  }
}
