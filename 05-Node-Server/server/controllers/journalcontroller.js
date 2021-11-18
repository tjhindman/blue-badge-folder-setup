let express = require("express");
let router = express.Router();

let validateSession = require("../middleware/validate-session");
// .require().import() ???
const Journal = require("../db").import("../models/journal");

router.get("/practice", validateSession, (req, res) => {
  res.send("This is the practice route!");
});

router.post("/create", validateSession, (req, res) => {
  const journalEntry = {
    title: req.body.journal.title,
    date: req.body.journal.date,
    entry: req.body.journal.entry,
    owner: req.user.id,
  };

  Journal.create(journalEntry)
    .then((journal) => res.status(200).json(journal))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", (req, res) => {
  Journal.findAll()
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/mine", validateSession, (req, res) => {
  let userId = req.user.id;

  Journal.findAll({
    where: { owner: userId },
  })
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:title", validateSession, (req, res) => {
  Journal.findAll({
    where: { title: req.params.title },
  })
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:entryId", validateSession, (req, res) => {
  const updateJournalEntry = {
    title: req.body.journal.title,
    date: req.body.journal.date,
    entry: req.body.journal.entry,
  };

  const query = {
    where: { id: req.params.entryId, owner: req.user.id },
  };

  // need to look into Model.update() method for SQL models
  // - First argument contains an object holding the new value we want to edit into the database (updateJournalEntry).
  // - Second argument tells Sequelize where to place the new data if a match is found (query).
  Journal.update(updateJournalEntry, query)
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, (req, res) => {
  const query = {
    where: { id: req.params.id, owner: req.user.id },
  };

  Journal.destroy(query)
    .then(() => res.status(200).json({ message: "Journal entry removed!" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
