const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '..', 'html');
const gameLinkRoot =
  '<li class="nav-item"><a class="nav-link page-link-transition" href="games.html">游戏</a></li>';
const gameLinkTerms =
  '<li class="nav-item"><a class="nav-link page-link-transition" href="../games.html">游戏</a></li>';

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, out);
    else if (f.name.endsWith('.html')) out.push(p);
  }
  return out;
}

for (const file of walk(htmlDir)) {
  if (path.basename(file) === 'games.html') continue;
  let c = fs.readFileSync(file, 'utf8');
  if (c.includes('games.html')) continue;

  const isTerm = file.includes(`${path.sep}terms${path.sep}`);
  const link = isTerm ? gameLinkTerms : gameLinkRoot;
  const before = c;

  c = c.replace(
    /(<li class="nav-item"><a class="nav-link[^"]*"[^>]*href="[^"]*culture-library\.html">文化联动库<\/a><\/li>)(\s*<li class="nav-item"><a class="nav-link[^"]*"[^>]*href="[^"]*heritage\.html">)/,
    `$1${link}$2`
  );

  if (c === before) {
    console.log('skip (no match):', path.relative(htmlDir, file));
    continue;
  }

  fs.writeFileSync(file, c, 'utf8');
  console.log('updated:', path.relative(htmlDir, file));
}
