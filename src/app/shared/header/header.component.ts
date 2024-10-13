import { Component, OnInit } from '@angular/core';
import { BotesService } from '../../services/botes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  botes: {[key: string]: number} = {};

  constructor(private botesService: BotesService) { }

  ngOnInit(): void {
    this.actualizarBotes();
    setInterval(() => {
      this.actualizarBotes();
    }, 60000);
  }

  actualizarBotes(): void {
    this.botesService.getBotes().subscribe({
      next: (data) => {
        this.botes = data;
      },
      error: (error) => {
        console.error('Error al obtener los botes', error);
        this.botes = {};
      }
    });
  }

  formatearBote(valor: number): string {
    return valor >= 1000000 
      ? `${Math.floor(valor / 1000000)}<span class="miles">MILLONES</span>` 
      : `${valor.toLocaleString('es-ES')}<span class="miles">€</span>`;
  }
}
