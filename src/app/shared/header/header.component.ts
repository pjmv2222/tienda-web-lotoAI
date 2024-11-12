import { Component, OnInit } from '@angular/core';
import { BotesService } from '../../services/botes.service'; // Actualizada la ruta
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

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

  constructor(
    private botesService: BotesService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.botesService.getBotes().subscribe({
        next: (data) => {
          this.botes = data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al cargar botes:', error);
        }
      });
    }
  }

  actualizarBotes(): void {
    console.log('Actualizando botes...');
    this.botesService.getBotes().subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data);
        if (data && typeof data === 'object') {
          this.botes = data;
          console.log('Botes actualizados:', JSON.stringify(this.botes, null, 2));
          this.cdr.detectChanges();
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
      return 'Pendiente';
    }
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(bote);
  }

  getImageUrl(juego: string): string {
    const imageNames: { [key: string]: string } = {
      'euromillones': 'cabecera_EuromillonesAJ_topaz.png',
      'primitiva': 'cabecera_PrimitivaAJ_topaz.png',
      'bonoloto': 'cabecera_BonolotoAJ_topaz.png',
      'gordoPrimitiva': 'cabecera_ElGordoAJ_topaz.png',
      'euroDreams': 'cabecera_EurodreamsAJ_topaz.png',
      'loteriaNacional': 'cabecera_LoteriaNacionalAJ_topaz.png'
    };
    return `/assets/img/${imageNames[juego] || juego + '.png'}`;
  }
}
