/* eslint-disable no-console */
import axios from 'axios'
import cheerio from 'cheerio'

// '/home/michael/projects/prepfootball/data/teams/index.htm'
// 'http://misshsfootball.com/Teams/index.htm'

async function getHTML(url) {
  const {data: html} = await axios.get(url)
  return html
}

async function getTeams(html) {
  const $ = cheerio.load(html)
  $('[width=152]').children('a').map((idx, ele) => {
    const teamName = $(ele).text()
    const teamURI = $(ele).attr('href')
    console.log(`${idx}) ${teamName} || ${teamURI}`)
  })
}

export {
  getHTML,
  getTeams
}
