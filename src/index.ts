import express from 'express';
import './db/mongoose.js';
import { MagicCardModel } from './models/card.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/cards', (req, res) => {
  const card = new MagicCardModel(req.body);

  card
    .save()
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get('/cards', (req, res) => {
  const filter = req.query.id ? { id: req.query.id.toString() } : {};

  MagicCardModel.find(filter)
    .then((cards) => {
      if (cards.length !== 0) {
        res.send(cards);
      } else {
        res.status(404).send();
      }
    })
    .catch(() => {
      res.status(500).send();
    });
});

app.patch('/cards', (req, res) => {
  if (!req.query.id) {
    res.status(400).send({
      error: 'A id must be provided',
    });
  } else {
    const allowedUpdates = ['name', 'manaCost', 'rulesText'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      MagicCardModel.findOneAndUpdate({ id: req.query.id.toString() }, req.body, {
        new: true,
        runValidators: true,
      })
        .then((card) => {
          if (!card) {
            res.status(404).send();
          } else {
            res.send(card);
          }
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  }
});

app.delete('/cards', (req, res) => {
  if (!req.query.id) {
    res.status(400).send({
      error: 'A id must be provided',
    });
  } else {
    MagicCardModel.findOneAndDelete({ id: req.query.id.toString() })
      .then((card) => {
        if (!card) {
          res.status(404).send();
        } else {
          res.send(card);
        }
      })
      .catch(() => {
        res.status(400).send();
      });
  }
});

app.all('*', (_, res) => {
  res.status(501).send();
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
