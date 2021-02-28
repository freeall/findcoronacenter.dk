const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const regions = {
  hovedstaden: 'https://www.regionh.dk/Sundhed/Akut-hj%C3%A6lp/1813/coronavirus/Sider/Find-vej-og-parkering-ved-TestCenter-Danmark-telte.aspx'
}

update({ name: 'hovedstaden', url: regions.hovedstaden }).then(() => console.log('done'))

async function update ({ name, url }) {
  const filepath = path.join('regions', name)
  const oldData = fs.existsSync(filepath) ? fs.readFileSync(filepath).toString() : ''
  const { data: newData } = await axios.get(url)
  let hasUpdated = false

  if (name === 'hovedstaden') hasUpdated = hasHovedstadenUpdated({ newData, filepath })

  if (hasUpdated) {
    fs.writeFileSync(filepath, newData)
    console.log(`${name} has updated! Check ${url}`)
  }
}

function hasHovedstadenUpdated ({ newData, filepath }) {
  // Some lines always update when page is requested, so this is a way to ignore those
  let hasUpdated = false
  fs.writeFileSync('tmp', newData)
  try {
    execSync(`diff tmp ${filepath}`)
  } catch (err) {
    const diffOutput = err.stdout.toString()
    const diffChangesCount = (diffOutput.match(/\< /g) || []).length
    const hasCorrectNumberOfChanges = diffChangesCount === 3

    if (!hasCorrectNumberOfChanges) {
      hasUpdated = true
      console.log(diffOutput)
    }
  }

  fs.unlinkSync('tmp')
  return hasUpdated
}
