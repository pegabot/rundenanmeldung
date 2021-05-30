/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/discord/blob/main/LICENSE for details)
 */

import { json } from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import * as path from "path";
import { sessionRouter } from "./api/session";

config();
const app = express();

app.use(json());

app.get("/ping", (_: express.Request, res: express.Response) => {
  res.send("Pong!");
});

app.use("/api/session", cors({ origin: "https://rundenaushang.pegabot.io", optionsSuccessStatus: 200 }), sessionRouter);

app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.static(path.resolve(__dirname, "../ui/build")));

app.listen(process.env.PORT || 80, () => console.log(`💻 Webserver gestartet!`));
