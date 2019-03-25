import axios from 'axios'
import cheerio from 'cheerio'

async function scrapeHTML(url) {
  const {data: html} = await axios.get(url)
  return html
}

async function scrapeTeams(html) {
  const teams = []
  const $ = cheerio.load(html)
  $('[width=152]').children('a').map((idx, ele) => {
    const teamName = $(ele).text()
    const teamURI = $(ele).attr('href')
    teams.push([teamName, teamURI])
  })
  return teams
}

export {
  scrapeHTML,
  scrapeTeams
}
