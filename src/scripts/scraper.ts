// src/scripts/scraper.ts

import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function formatearNumero(numero: string): Promise<string> {
    return numero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

async function scrapeBotes(): Promise<void> {
    try {
        console.log('Iniciando scraping...');
        
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        
        const page = await browser.newPage();
        
        const botes = {
            primitiva: '0',
            bonoloto: '',  // Valor vacío por defecto
            euromillones: '0',
            gordo: '0',
            nacional: '300000'  // Valor fijo para Lotería Nacional
        };

        let datosRecopilados = false;

        page.on('console', msg => {
            const text = msg.text();
            if (text.includes('JSON draw data')) {
                const match = text.match(/gameId=([^;]+).*jackpot=(\d+|null)/);
                if (match) {
                    const [_, gameId, jackpot] = match;
                    datosRecopilados = true;

                    switch(gameId) {
                        case 'LAPR':
                            if (jackpot && jackpot !== 'null') {
                                botes.primitiva = (parseInt(jackpot) / 1000000).toFixed(1);
                            }
                            break;
                        case 'EMIL':
                            if (jackpot && jackpot !== 'null') {
                                botes.euromillones = (parseInt(jackpot) / 1000000).toFixed(1);
                            }
                            break;
                        case 'ELGR':
                            if (jackpot && jackpot !== 'null') {
                                botes.gordo = (parseInt(jackpot) / 1000000).toFixed(1);
                            }
                            break;
                        case 'BONO':
                            if (jackpot && jackpot !== 'null') {
                                botes.bonoloto = (parseInt(jackpot) / 1000000).toFixed(1);
                            }
                            break;
                        // Eliminamos el caso LNAC ya que usamos valor fijo
                    }
                }
            }
        });

        await page.goto('https://www.loteriasyapuestas.es/es', {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        await delay(5000);

        console.log('Datos extraídos:', {
            primitiva: botes.primitiva + 'M €',
            bonoloto: botes.bonoloto ? botes.bonoloto + 'M €' : '',  // String vacío si no hay bote
            euromillones: botes.euromillones + 'M €',
            gordo: botes.gordo + 'M €',
            nacional: formatearNumero(botes.nacional) + ' €\n1ER PREMIO A LA SERIE'
        });
        
        const outputPath = path.join(process.cwd(), 'src', 'assets');
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }
        
        fs.writeFileSync(
            path.join(outputPath, 'botes.json'),
            JSON.stringify(botes, null, 2)
        );
        
        await browser.close();
        console.log('Scraping completado');
        
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

scrapeBotes();