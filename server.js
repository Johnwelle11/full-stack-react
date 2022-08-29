const express = require("express");
const cors = require("cors");

const createServer = (pool) => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/tasks", (req, res) => {
    pool.query("SELECT * FROM tasks").then((result) => {
      res.send(result.rows);
    });
  });

  app.post("/api/tasks", (req, res) => {
    const { description } = req.body;
    pool
      .query("INSERT INTO tasks (description) VALUES ($1) RETURNING *", [
        description,
      ])
      .then((result) => {
        res.send(result.rows[0]);
      });
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    const { id } = req.params;

    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.sendStatus(200);
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const result = await pool.query(
      "UPDATE tasks SET description=$1 WHERE id=$2 RETURNING *",
      [description, id]
    );
    res.send(result.rows[0]);
  });

  return app;
};

module.exports = createServer;
