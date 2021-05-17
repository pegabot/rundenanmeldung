/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import express from "express";
import statusCode from "http-status-codes";
import { CustomFormData } from "../interfaces/CustomFormData";

export const sessionRouter = express();

sessionRouter.post("/", (req, res) => {
  const data: CustomFormData = req.body;

  if (!data.name) return res.status(statusCode.BAD_REQUEST).send("missing data!");

  //FIXME: implement the main logic here

  console.log(data);
  return res.status(statusCode.OK).end();
});
