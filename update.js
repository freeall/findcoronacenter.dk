const puppeteer = require('puppeteer')
const fs = require('fs')

run()

async function run () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://coronasmitte.dk/raad-og-regler/kort-over-covid-19-testcentre', { waitUntil: 'networkidle0' })
  const data = await page.evaluate(
    () => centres
  )
  fs.writeFileSync('data.raw', JSON.stringify(data))
  console.log('data', data)
}
