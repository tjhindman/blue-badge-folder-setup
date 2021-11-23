let express = require("express");
let router = express.Router();

let validateSession = require("../middleware/validate-session");
const { JournalModel } = require("../models");

router.post("/create", validateSession, async (req, res) => {
  const { title, date, entry } = req.body.journal;
  const { id } = req.user;

  const journalEntry = {
    title,
    date,
    entry,
    owner: id,
  };

  try {
    const newJournal = await JournalModel.create(journalEntry);

    res.status(200).json(newJournal);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const entries = await JournalModel.findAll();

    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.get("/mine", validateSession, async (req, res) => {
  let { id } = req.user;

  try {
    const userJournals = await JournalModel.findAll({
      where: { owner: id },
    });

    res.status(200).json(userJournals);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.get("/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const results = await JournalModel.findAll({
      where: {
        title,
      },
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.put("/update/:entryId", validateSession, async (req, res) => {
  const { title, date, entry } = req.body.journal;
  const journalId = req.params.entryId;
  const userId = req.user.id;

  const updateJournalEntry = {
    title,
    date,
    entry,
  };

  const query = {
    where: {
      id: journalId,
      owner: userId,
    },
  };

  try {
    // need to look into Model.update() method for SQL models
    // - First argument contains an object holding the new value we want to edit into the database (updateJournalEntry).
    // - Second argument tells Sequelize where to place the new data if a match is found (query).
    const update = await JournalModel.update(updateJournalEntry, query);

    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.delete("/delete/:id", validateSession, async (req, res) => {
  const ownerId = req.user.id;
  const journalId = req.params.id;
  try {
    const query = {
      where: {
        id: journalId,
        owner: ownerId,
      },
    };

    await JournalModel.destroy(query);
    res.status(200).json({ message: "Journal entry removed!" });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

module.exports = router;
