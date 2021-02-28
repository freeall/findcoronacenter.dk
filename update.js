const axios = require('axios')
const { JSDOM } = require('jsdom')
const puppeteer = require('puppeteer')

run()

async function run () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://coronasmitte.dk/raad-og-regler/kort-over-covid-19-testcentre', { waitUntil: 'networkidle0' })
  const data = await page.evaluate(
    () => centres
  )
  console.log('data', data)
}
