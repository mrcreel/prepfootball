/* eslint-disable no-console */
/**
 *'/home/michael/projects/prepfootball/data/teams/index.htm'
 *'http://misshsfootball.com/Teams/index.htm'
 *
 * https://github.com/siegfriedgrimbeek/cheerio-pagination-tutorial/blob/master/index.js
 * https://www.thepolyglotdeveloper.com/2018/05/scraping-paginated-lists-nodejs-cheerio-async-await-recursion/
 *
*/
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const chalk = require('chalk')

const app = express()

app.get('/scrape', (req, res, next) => {
  console.log('Scraping')
})

app.listen(1492, () => console.log('Running on 1492')) 


const url = 'http://misshsfootball.com/Teams/index.htm'
const outputFile = './backend/scraper/data/teams/teams.json'
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
      console.log(`${idx}) ${metadata.teamName} <${chalk.underline(metadata.teamURI)}/>`)
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


