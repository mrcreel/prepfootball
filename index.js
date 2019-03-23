import {
  getHTML,
  getTeams
}  from './lib/scraper'

async function go() {
  getTeams(await getHTML('http://misshsfootball.com/Teams/index.htm'))
}

go()