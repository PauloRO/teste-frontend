import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Isso faz com que o service seja injetável em toda a aplicação
})
export class StorageService {
  constructor() {}

  // Salva um item no localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value)); // Converte o valor para string
  }

  // Obtém um item do localStorage
  getItem(key: string): string {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : 'Usuário'; // Converte de volta para o tipo original
  }

  // Remove um item do localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpa todo o localStorage
  clear(): void {
    localStorage.clear();
  }
}