import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: any[] = [];
  private cart = new BehaviorSubject<any[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  agregarAlCarrito(producto: any): void {
    this.items.push(producto);
    this.cart.next(this.items);
  }

  obtenerItems(): any[] {
    return this.items;
  }

  limpiarCarrito(): void {
    this.items = [];
    this.cart.next(this.items);
  }
}