const fs = require('fs');
const html = fs.readFileSync('cocurriculars_fetch.html', 'utf8');
const matches = html.match(/<img[^>]+src="([^"]+)"[^>]*>/gi);
if (matches) {
  matches.forEach(m => console.log(m));
}
