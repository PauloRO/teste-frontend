import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Client } from '../model/cliente';

@Injectable()
export class ClientService {
  private requestURL = 'https://boasorte.teddybackoffice.com.br/';

  private clients: any[] = [];
  private clientSubject = new BehaviorSubject<any[]>(this.clients);
  clients$ = this.clientSubject.asObservable();

  private clientsSelecionadosSubject = new BehaviorSubject<any[]>([]);
  clientsSelecionados$ = this.clientsSelecionadosSubject.asObservable();

  private totalElements = 0;
  private currentPage = 0;
  private totalPages = 0; 

  constructor(private http: HttpClient) {}

  findUsers(page: number, limit: number): void {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    this.http
      .get<{ clients: any[]; currentPage: number, totalPages:number }>(this.requestURL + 'users', { params })
      .pipe(
        tap((res) => {
          this.clients = res.clients.map((c) => ({ ...c, selecionado: false }));
          this.totalElements = this.clients.length;
          this.currentPage = res.currentPage
          this.totalPages = res.totalPages;
          this.clientSubject.next(this.clients);
        })
      )
      .subscribe();
  }

  private salvarClientesSelecionados(clientes: any[]): void {
    localStorage.setItem('clientesSelecionados', JSON.stringify(clientes));
  }
  

  private carregarClientesSelecionados(): any[] {
    const clientes = localStorage.getItem('clientesSelecionados');
    return clientes ? JSON.parse(clientes) : [];
  }

  toggleSelectClient(client: any): void {
    let clientesSelecionados = this.carregarClientesSelecionados();
  
    if (client.selecionado) {
      clientesSelecionados = clientesSelecionados.filter(c => c.id !== client.id);
    } else {
      if (!clientesSelecionados.some(c => c.id === client.id)) {
        clientesSelecionados.push(client);
      }
    }
  
    client.selecionado = !client.selecionado;
  
    this.clientsSelecionadosSubject.next(clientesSelecionados);
    this.salvarClientesSelecionados(clientesSelecionados);
  }
  
  

  removerClienteSelecionado(cliente: any): void {
    const clientesAtuais = this.getClientesSelecionados();
    const clientesAtualizados = clientesAtuais.filter((c) => c.id !== cliente.id);
    this.clientsSelecionadosSubject.next(clientesAtualizados);
    this.salvarClientesSelecionados(clientesAtualizados);

    const client = this.clients.find((u) => u.id === cliente.id);
    if (client) {
      client.selecionado = false;
      this.clientSubject.next(this.clients);
    }
  }
  
  getClientesSelecionados(): any[] {
    return this.carregarClientesSelecionados();
  }

  getTotalElements(): number { 
    return this.totalElements;
  }

  getCurrentPage(): number { 
    return this.currentPage;
  }

  getTotalPages(): number { 
    return this.totalPages;
  }

  save(client: Client): Observable<any> {
    if (client.id != null) {
      const link = this.requestURL + `users/${client.id}`;
      return this.http.patch<any>(link, client);
    } else {
      const link = this.requestURL + 'users';
      return this.http.post<any>(link, client);
    }
  }

  delete(id: number): Observable<any> {
    const link = this.requestURL + `users/${id}`;
    return this.http.delete<any>(link);
  }
}
