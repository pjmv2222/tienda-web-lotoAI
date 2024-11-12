const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrapeBotes() {
    try {
        const response = await axios.get('https://www.loteriasyapuestas.es');
        const $ = cheerio.load(response.data);
        
        const botes = {
            primitiva: '',
            bonoloto: '',
            euromillones: '',
            gordo: ''
            // Añadir más juegos según necesites
        };

        // Ajustar los selectores según la estructura real de la página
        $('.bote-cantidad').each((i, element) => {
            const texto = $(element).text().trim();
            const cantidad = texto.replace(/[^0-9]/g, '');
            
            // Identificar el juego y guardar su bote
            if ($(element).closest('.primitiva').length) {
                botes.primitiva = cantidad;
            }
            // Añadir más condiciones para otros juegos
        });

        // Guardar los datos en un archivo JSON
        const outputPath = path.join(process.cwd(), 'src', 'assets', 'botes.json');
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, JSON.stringify(botes, null, 2));
        
        console.log('Botes actualizados correctamente');
        
    } catch (error) {
        console.error('Error al scrapear los botes:', error);
        process.exit(1);
    }
}

scrapeBotes();
