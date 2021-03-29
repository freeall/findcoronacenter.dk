const puppeteer = require('puppeteer')
const fs = require('fs')
const { open } = require('inspector')

run()

async function run () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://coronasmitte.dk/raad-og-regler/kort-over-covid-19-testcentre', { waitUntil: 'networkidle0' })
  const data = await page.evaluate(
    () => centres
  )
  fs.writeFileSync('data.js', `
    lastUpdated = '${new Date().toString()}'
    centers = ${JSON.stringify(data)}
  `)
  console.log('Updated. Stored in data.js')
  process.exit(0)
}
