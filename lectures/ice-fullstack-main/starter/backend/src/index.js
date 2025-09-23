// !!! IMPORTANT !!!
// Be sure to run 'npm run dev' from a
// terminal in the 'backend' directory!

import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

import { applyRateLimiting, applyLooseCORSPolicy, applyBodyParsing, applyLogging, applyErrorCatching } from './api-middleware.js'

const app = express();
const port = 53706;

const GET_POST_SQL = 'SELECT * FROM BadgerComment;'
const GET_SPECIFIC_POST_SQL = 'SELECT * FROM BadgerComment WHERE id = ?;'
const INSERT_POST_SQL = 'INSERT INTO BadgerComment(comment, created) VALUES (?, ?) RETURNING id;'
const DELETE_POST_SQL = "DELETE FROM BadgerComment WHERE id = ?;"

const db = await open({
    filename: process.env['MINI_BADGERCHAT_DB_LOC'] ?? "./db.db",
    driver: sqlite3.Database
});

await db.exec("CREATE TABLE IF NOT EXISTS BadgerComment(id INTEGER PRIMARY KEY UNIQUE, comment TEXT NOT NULL, created TIMESTAMP NOT NULL);")

applyRateLimiting(app);
applyLooseCORSPolicy(app);
applyBodyParsing(app);
applyLogging(app);

app.get('/api/hello-world', (req, res) => {
    res.status(200).send({
        msg: "Hello! :)"
    })
})


app.get('/api/comments', async (req, res) => {
    const comments = await db.all(GET_POST_SQL);
    res.status(200).send(comments)
})

app.post('/api/comments', async (req, res) => {
    const text = req.body.comment;

    try {
        if (text) {
            const id = await db.get(INSERT_POST_SQL, text, new Date())

            res.status(200).send({
                msg: "I created the comment",
            })
        } else {
            res.status(400).send({
                msg: "No content",
            })
        }

    } catch (e) {
        res.status(500).send({
            msg: "Something went wrong database busy, try again."
        })
    }


})

app.delete('/api/comments', async (req, res) => {
    const commentId = req.query.id;

    if (!commentId) {
        return res.status(400).send({ msg: "Missing comment id" });
    }

    try {
        const result = await db.run(DELETE_POST_SQL, commentId);

        if (result.changes === 0) {
            res.status(404).send({ msg: "Comment not found" });
        } else {
            res.status(200).send({ msg: "Comment deleted successfully" });
        }
    } catch (e) {
        res.status(500).send({ msg: "Database error during deletion" });
    }
});

applyErrorCatching(app);

// Open server for business!
app.listen(port, () => {
    console.log(`My API has been opened on :${port}`)
});
