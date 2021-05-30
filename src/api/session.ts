/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import express from "express";
import statusCode from "http-status-codes";
import { Card } from "../types/trello";
import { generateCard } from "../utils/trello";

export const sessionRouter = express();

sessionRouter.post("/", async (req, res) => {
  const cardData: Card = req.body;
  console.log(cardData);

  const error = await generateCard(cardData);

  console.log(error);

  if (error) return res.status(statusCode.INTERNAL_SERVER_ERROR).send("An error occured!");

  return res.status(statusCode.OK).end();
});
