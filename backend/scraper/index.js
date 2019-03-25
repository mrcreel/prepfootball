/**
 *'/home/michael/projects/prepfootball/data/teams/index.htm'
 *'http://misshsfootball.com/Teams/index.htm'
 *
 * https://www.thepolyglotdeveloper.com/2018/05/scraping-paginated-lists-nodejs-cheerio-async-await-recursion/
 * https://github.com/siegfriedgrimbeek/cheerio-pagination-tutorial/blob/master/index.js
 * lx
 * import {
 *  scrapeHTML,
 *   scrapeTeams
 * }  from './lib/scraper'
*/

const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const chalk = require('chalk')

const url = 'http://misshsfootball.com/Teams/index.htm'
const outputFile = './data/teams/teams.json'
const parsedResults = []

console.log(chalk.yellow.bgBlue(`\n  Scraping of ${chalk.underline.bold(url)} initiated...\n`))

const getWebsiteContent = async (url) => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    $('[width=152]').children('a').map((idx, ele) => {
      const metadata = {
        teamName: $(ele).text(),
        teamURI: $(ele).attr('href')
      }
      console.log(`${metadata.count}) ${metadata.teamName} <${chalk.underline(metadata.teamURI)}/>`)
      parsedResults.push(metadata)
    })
  }
  catch(error) {
    console.log(error)
  }
  exportResults(parsedResults)
}

const exportResults = (parsedResults) => {
  fs.writeFile(outputFile, JSON.stringify(parsedResults, null, 4), (err) => {
    if (err) {
      console.log(err)
    }
    console.log(chalk.yellow.bgBlue(`\n ${chalk.underline.bold(parsedResults.length)} Results exported successfully to ${chalk.underline.bold(outputFile)}\n`))
  })
}

getWebsiteContent(url)
