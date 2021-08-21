const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
let html = fs.readFileSync('./template.html', 'utf8')
const cheerio = require('cheerio')
const $ = cheerio.load(html)

const util = require('util')

/**
 * Database Object
 * File or datastore with { key:value } pairs 
 * (i.e 'God of War': 6369)
 * Game Display Name: IGDB ID
 */
const db = {
}

async function gameNameLookup(name) {
        // Gets name and lookup background info
        let info = fetch(``)
                .then(d => d.json())
                .then((data) => {
                        return data.data[0]
                })
        return info;
}


module.exports = async (obj) => {
        // Get description from object.
        const { description } = await obj;
        // Parsing description.
        let desc = await description.split('\n');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 })
        // Set content in view.
        var game = await gameNameLookup(desc[3].slice(8).trim())
        await $('.title').text(desc[3].slice(8).trim());
        // Set background image.
        await $('body').css('background-image', `url('')`);
        // Render content.
        await page.setContent($.html());
        // Save thumbnail.
        await page.screenshot({ path: './thumbs/' + game.id + '.jpg', quality: 100, type: 'jpeg' });
        await browser.close();
        // Return image as binary.
        return fs.readFileSync('./thumbs/' + game.id + '.jpg')
}
