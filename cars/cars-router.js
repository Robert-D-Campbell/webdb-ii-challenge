const express = require("express");
const knex = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "The list of cars could not be retrieved" });
    });
});
router.get("/:id", (req, res) => {
  knex
    .select("*")
    .from("cars")
    .where("id", "=", req.params.id)
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "The specific car could not be retrieved" });
    });
});
router.post("/", (req, res) => {
  knex
    .insert(req.body, "id") //ignore console warning on sqlite
    .into("cars")
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The car could not be added" });
    });
});
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  knex("cars")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The car could not be edited" });
    });
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  knex("cars")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The car could not be deleted" });
    });
});

module.exports = router;
