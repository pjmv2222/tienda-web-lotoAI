const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeBotes() {
  try {
    const response = await axios.get('https://www.loteriasyapuestas.es/es');
    const $ = cheerio.load(response.data);
    
    const botes = {
      euromillones: $('.game-euromillones .jackpot-amount').text().trim(),
      primitiva: $('.game-primitiva .jackpot-amount').text().trim(),
      bonoloto: $('.game-bonoloto .jackpot-amount').text().trim(),
      // Añade más juegos según sea necesario
    };

    fs.writeFileSync('src/assets/botes.json', JSON.stringify(botes, null, 2));
    console.log('Botes actualizados correctamente');
  } catch (error) {
    console.error('Error al scrapear los botes:', error);
  }
}

scrapeBotes();
