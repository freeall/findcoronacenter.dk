const puppeteer = require('puppeteer')
const fs = require('fs')
const { open } = require('inspector')

console.warn('Deprecated - data.js is no longer updated manually');

return;

run()

async function run () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://coronasmitte.dk/raad-og-regler/kort-over-covid-19-testcentre', { waitUntil: 'networkidle0' })
  const data = await page.evaluate(
    () => centres
  )
  data.forEach(center => {
  	// Overwrite directions link with actual directions link
  	center.directionsLink = `https://www.google.com/maps/dir//${center.latitude},${center.longitude}/@${center.latitude},${center.longitude},14z`
  });
  fs.writeFileSync('data.js', `
    lastUpdated = '${new Date().toString()}'
    centers = ${JSON.stringify(data)}
  `)
  console.log('Updated. Stored in data.js')
  process.exit(0)
}
