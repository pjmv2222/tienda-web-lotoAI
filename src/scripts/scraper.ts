// src/scripts/scraper.ts

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function formatearNumero(numero: string): Promise<string> {
    return numero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

interface ConsoleMessage {
    text: () => string;
}

async function scrapeBotes() {
    try {
        const response = await axios.get('https://www.loteriasyapuestas.es');
        const $ = cheerio.load(response.data);
        
        const botes = {
            primitiva: '',
            bonoloto: '',
            euromillones: '',
            gordo: ''
        };

        // Lógica de scraping
        $('.bote-cantidad').each((i, element) => {
            const texto = $(element).text().trim();
            const cantidad = texto.replace(/[^0-9]/g, '');
            
            if ($(element).closest('.primitiva').length) {
                botes.primitiva = cantidad;
            }
            // Añadir más juegos
        });

        const outputPath = path.join(process.cwd(), 'src', 'assets', 'botes.json');
        fs.writeFileSync(outputPath, JSON.stringify(botes, null, 2));
        
        console.log('Botes actualizados correctamente');
        
    } catch (error) {
        console.error('Error al scrapear los botes:', error);
        process.exit(1);
    }
}

scrapeBotes();