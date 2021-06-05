/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import express from "express";
import statusCode from "http-status-codes";
import { Card } from "../types/trello";
import { generateCard } from "../utils/trello";

export const CardRouter = express();

CardRouter.post("/", async (req, res) => {
  if (req.headers["token"] !== process.env.REACT_APP_API_TOKEN) return res.status(statusCode.FORBIDDEN).send("Invalid API Token was used!");

  const cardData: Card = req.body;
  console.log(cardData);

  if (process.env.NODE_ENV === "production") {
    const error = await generateCard(cardData);
    if (error) return res.status(statusCode.INTERNAL_SERVER_ERROR).send("An error occured!");
  }
  return res.status(statusCode.OK).end();
});
