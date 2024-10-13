import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service'; // Ruta correcta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.obtenerItems();
  }

  limpiarCarrito(): void {
    this.cartService.limpiarCarrito();
    this.items = [];
  }
}
