/*
 * Copyright (c) 2021 - 2022 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/discord/blob/main/LICENSE for details)
 */

import { json } from "body-parser";
import express from "express";
import rateLimit from "express-rate-limit";
import * as path from "path";
import { CardRouter } from "./api/card";

const app = express();

app.set("trust proxy", 1);
app.use(json());

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

app.get("/", (_, res) => {
  res.redirect("https://pegasus.de/conspiracy/rundenanmeldung");
});

app.use("/app", express.static(path.resolve(__dirname, "../ui/build")));

app.use("/api", rateLimiter);
app.use("/api/card", CardRouter);

app.get("/ping", (_, res) => {
  res.send("Pong!");
});

app.listen(process.env.PORT || 80, () => console.log(`💻 Webserver gestartet!`));
