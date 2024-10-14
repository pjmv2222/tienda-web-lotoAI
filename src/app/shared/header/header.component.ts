import { Component, OnInit } from '@angular/core';
import { BotesService } from './botes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  botes: any = {};
  algunValor: number | undefined;

  constructor(private botesService: BotesService) {}

  ngOnInit(): void {
    this.actualizarBotes();
    this.algunValor = 1000000; // Inicializa con un valor adecuado
    setInterval(() => {
      this.actualizarBotes();
    }, 60000);
  }

  actualizarBotes(): void {
    this.botesService.getBotes().subscribe({
      next: (data: any) => {
        if (data && typeof data === 'object') {
          this.botes = data;
        } else {
          console.error('Datos de botes inválidos', data);
          this.botes = {};
        }
      },
      error: (error: any) => {
        console.error('Error al obtener los botes', error);
        this.botes = {};
      }
    });
  }

  formatearBote(bote: number | undefined): string {
    if (bote === undefined || bote === null) {
      return 'N/A'; // O cualquier valor por defecto que prefieras
    }
    return bote.toLocaleString('es-ES');
  }
}
