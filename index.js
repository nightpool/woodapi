var fs         = require('fs')
  , express    = require('express')
  , bodyParser = require('body-parser')
  , cors       = require('cors')
  , port = 8080;

let data = parse_trees(JSON.parse(fs.readFileSync("GWDD.json")));

var app = express()

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

let query = {
  "family": "string",
  "genus": "string",
  "species": "string",
  "region": "string",
  "climate": "string",
  "density": "number",
  "ref_num": "number",
  "id": "number"
};

app.get('/trees', function (req, res) {
  res.json(data);

  // TODO FILTER
});

app.post('/trees', function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }

  let data = validate(req.body);

  data.push(req.body);

  res.json(data);
})

app.put('/trees/:tree', function (req, res) {
  if (!req.body) return res.sendStatus(400)

  // TODO
});

app.delete('/trees/:tree', function (req, res) {
  if (!req.body) return res.sendStatus(400)

  let id = req.params.tree;

  // TODO
  data.splice(data.indexOf(id), 1);
  res.json(data);
});

function validate(argument) {
  return argument;
}

app.listen(process.env.PORT || port);
