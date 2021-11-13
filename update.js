require('load-environment')
const puppeteer = require('puppeteer')
const fs = require('fs')
const { open } = require('inspector')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const useS3 = process.env.AWS_S3_BUCKET && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

run()

async function run () {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setExtraHTTPHeaders({
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,da;q=0.8,es;q=0.7',
    'cache-control': 'max-age=0',
    'referer': 'https://coronasmitte.dk/',
    'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
  })
  await page.goto('https://coronasmitte.dk/raad-og-regler/kort-over-covid-19-testcentre', {
    waitUntil: 'networkidle0'
  })
  await new Promise(r => setTimeout(r, 10000))
  const html = await page.evaluate(() => document.documentElement.outerHTML)
  let centers
  try {
    centers = await page.evaluate(
      () => centres
    )
  } catch (err) {
    if (useS3) {
      const filename = `error - ${new Date().toLocaleDateString}.html`
      await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: 'data.js',
        Body: Buffer.from(html)
      }))
      console.error(`Due to error, the fetched html was stored in ${filename}`)
    }
    throw err
  }

  centers.forEach(center => {
  	// Overwrite directions link with actual directions link
  	center.directionsLink = `https://www.google.com/maps/dir//${center.latitude},${center.longitude}/@${center.latitude},${center.longitude},14z`
  });
  const data = `
    lastUpdated = '${new Date().toString()}'
    centers = ${JSON.stringify(centers)}
  `
  fs.writeFileSync('data.js', data)
  console.log('Stored locally in data.js')

  if (useS3) {
    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: 'data.js',
      Body: Buffer.from(data)
    }))
    console.log('Stored remotely on S3')
  }

  process.exit(0)
}
