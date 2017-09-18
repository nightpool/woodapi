var fs         = require('fs')
  , express    = require('express')
  , bodyParser = require('body-parser')
  , port = 8080;

let data = JSON.parse(fs.readFileSync("data/game-scores.json"));

var app = express()

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/scores', function (req, res) {
  if (req.query.year) {
    res.json(data.filter(i => i.last_year < req.query.year))
  } else {
    res.json(data);
  }
});

app.put('/score/:score', function (req, res) {
  if (!req.body)
    return res.sendStatus(400)
  let [win, lose] = req.params.score.split("-");
  let score = data.filter(i => i.pts_win == win && i.pts_lose == lose)[0];

  req.body.counter && (score.counter = req.body.counter);
  req.body.last_year && (score.last_year = req.body.last_year);
  req.body.first_year && (score.first_year = req.body.first_year);

  res.json(data);
});

app.delete('/score/:score', function (req, res) {
  if (!req.body)
    return res.sendStatus(400)
  let [win, lose] = req.params.score.split("-");
  let score = data.filter(i => i.pts_win == win && i.pts_lose == lose)[0];

  data.splice(data.indexOf(score), 1);
  res.json(data);
})

app.post('/score', function (req, res) {
  if (!req.body) return res.sendStatus(400)

  if (req.body.counter <= 0) {
    req.body.counter = 1;
  }

  data.push(req.body);

  res.json(data);
})

app.listen(process.env.PORT || port);
