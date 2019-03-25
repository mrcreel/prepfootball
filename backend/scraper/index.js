/**
 *'/home/michael/projects/prepfootball/data/teams/index.htm'
 *'http://misshsfootball.com/Teams/index.htm'
*/

import {
  scrapeHTML,
  scrapeTeams
}  from './lib/scraper'

const page = 'http://misshsfootball.com/Teams/index.htm'

async function getTeams(page) {
  const data = scrapeTeams(await scrapeHTML(page))
  // eslint-disable-next-line no-console
  console.log(data)
}

getTeams(page)