/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import { config } from "dotenv";
import find from "find-config";
import { Card } from "src/types/trello";
import TrelloNodeAPI from "trello-node-api";
import { stripIndents } from "./stripIndents";
config({ path: find(".env", { dir: "ui", dot: true }) || "" });

const trello = new TrelloNodeAPI();
trello.setApiKey(process.env.TRELLO_API_KEY);
trello.setOauthToken(process.env.TRELLO_OAUTH_TOKEN);

export const generateCard = async (card: Card): Promise<Error | undefined> => {
  try {
    await trello.card.create({
      name: card.title,
      pos: "top",
      idList: "60b3d60869576f112d275efe",
      idCardSource: "60b3d9764f47c7232916a1e8",
      desc: stripIndents(
        `
        - Spielleitung/Moderation: ${card.gamemaster}

        - Beschreibung: 
          ${card.desc}

        - Tisch: ${card.table}

        - System: ${card.system}

        - Setting: ${card.setting}

        - Anzahl Spielplätze: ${card.players}

        - Tag: ${card.date}

        - Hinweis oder Warnungen: ${card.notes}

        - Technische Voraussetzungen: ${card.requirements}
        `.replace(/undefined/g, "nicht angegeben"),
      ),
    });
  } catch (error: any) {
    console.log(error);
    return error;
  }
  return;
};
