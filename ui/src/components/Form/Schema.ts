/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import { JSONSchema7 } from "json-schema";

export const dataSchema: JSONSchema7 = {
  type: "object",
  required: ["title", "gamemaster", "system", "setting", "desc", "date", "players"],
  properties: {
    title: {
      type: "string",
      title: "Gib deiner Spielrunde einen Titel",
    },
    gamemaster: {
      type: "string",
      title: "Wer leitet die Runde (Discord Name)?",
    },
    system: {
      type: "string",
      title: "Welches Rollenspielsystem wird gespielt?",
    },
    setting: {
      type: "string",
      title: "In welchem Setting spielt dein Abenteuer?",
    },
    table: {
      type: "string",
      title: "In welchem Discord-Kanal wird gespielt?",
      description: "Solltest du noch keinen Kanal haben, lasse dieses Feld einfach leer.",
    },
    friendly: {
      type: "boolean",
      title: "Ist deine Runde einsteigerfreundlich?",
      default: false,
    },
    desc: {
      type: "string",
      title: "Worum geht es in dem Abenteuer, das gespielt wird?",
    },
    date: {
      type: "string",
      title: "Wann startet deine Spielrunde und wann endet sie?",
      description: "Tag.Monat.Jahr Stunde:Minute - Stunde:Minute ",
    },
    players: {
      type: "number",
      title: "Wie viele Spieler können teilnehmen?",
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    notes: {
      type: "string",
      title: "Gibt es besondere Hinweise?",
    },
    requirements: {
      type: "string",
      title: "Gibt es technische Voraussetzungen (Discord, Roll20...)?",
    },
  },
};

export const uiSchema = {
  "ui:title": "CONspiracy Rundenanmeldung",
  "ui:description":
    "Melde deine Runde/n für die CONspiracy 7 über das nachfolgende Formular an und werde Teil des Teams! Erhalte für deinen Einsatz die Team Goodie Bag für Workshop und Spielleitende.",
  desc: {
    "ui:widget": "textarea",
  },
  players: {
    "ui:widget": "select",
  },
};
