const puppeteer = require('puppeteer');
const cards = require('../data');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        devtools: false,
        ignoreHTTPSErrors: true,
    });

    const out = [];

    for (c of cards) {
        c.pinyin = await getNewPinyin(c)
        out.push(c);
        console.log(c);
    }
    fs.writeFileSync("out.json", JSON.stringify(out, null, 2));

    async function getNewPinyin(card) {
        const text = card.chinese;
        const page = await browser.newPage();
        await page.setViewport({
            width: 1600,
            height: 900
        });
        await page.goto('http://translate.google.com/#view=home&op=translate&sl=zh-CN&tl=en&text=' + text, {
            waitUntil: "networkidle0"
        });
        let pinyin = await page.$$eval('div.tlid-transliteration-content.transliteration-content.full', divs => {
            return divs.map(div => div.textContent)
        })
        pinyin = pinyin.filter(t => t.length > 0);
        await page.close();
        return pinyin[0];
    }
    // Close the browser
    await browser.close();
})();