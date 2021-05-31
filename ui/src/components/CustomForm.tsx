/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import { Theme as Bootstrap4Theme } from "@rjsf/bootstrap-4";
import { FormProps, withTheme } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import React from "react";
import { Alert, Button } from "react-bootstrap";
import { ArrowCounterclockwise } from "react-bootstrap-icons";
import { sendData } from "../api/connector";
import "../css/CustomForm.css";

const Form = withTheme(Bootstrap4Theme);

const dataSchema: JSONSchema7 = {
  type: "object",
  required: ["title", "gamemaster", "system", "desc", "startDate", "endDate", "players"],
  properties: {
    title: {
      type: "string",
      title: "Gebe deiner Spielrunde einen Titel",
    },
    gamemaster: {
      type: "string",
      title: "Spielleitung (Discord Name)",
    },
    system: {
      type: "string",
      title: "Welches Rollenspielsystem wird gespielt?",
    },
    desc: {
      type: "string",
      title: "Beschreibe dein Spielrunde.",
    },
    startDate: {
      type: "string",
      title: "Wann startet deine Spielrunde?",
      format: "date-time",
    },
    endDate: {
      type: "string",
      title: "Wann endet deine Spielrunde?",
      format: "date-time",
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
      title: "Gibt es technische Vorraussetzungen (Discord, Roll20...)?",
    },
  },
};

const uiSchema = {
  "ui:title": "CONspiracy Rundenanmeldung",
  "ui:description": "Description",
  desc: {
    "ui:widget": "textarea",
  },
};

export class CustomForm extends React.Component<{}, { completed: boolean; error: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { completed: false, error: false };
    this.onSubmit = this.onSubmit.bind(this);
  }

  log = (type: any) => console.log.bind(console, type);

  onSubmit = async (data: FormProps<any>): Promise<void> => {
    try {
      await sendData({
        title: data.formData.title,
        gamemaster: data.formData.gamemaster,
        desc: data.formData.desc,
        system: data.formData.system,
        players: data.formData.players,
        date: `${new Date(data.formData.startDate).toLocaleString("de-de")}  - ${new Date(data.formData.endDate).toLocaleString("de-de")}`,
        notes: data.formData.notes || "keine",
        requirements: data.formData.requirements || "keine",
      });
    } catch (error) {
      console.log(error);
      this.onError();
    }

    this.setState({ completed: true });
  };

  onError = () => {
    this.setState({ error: true });
  };

  reset = () => {
    this.setState({ completed: false, error: false });
  };

  render() {
    return (
      <div className="container">
        {this.state.error ? (
          <>
            <Alert variant="danger">Ein Fehler ist aufgetreten, bitte versuche es später erneut!</Alert>
            <Button onClick={this.reset} type="submit" variant="warning">
              <ArrowCounterclockwise />
            </Button>
          </>
        ) : this.state.completed ? (
          <>
            <Alert variant="success">Vielen Dank für deine Einsendung!</Alert>
            <Button onClick={this.reset} type="submit" variant="warning">
              <ArrowCounterclockwise />
            </Button>{" "}
          </>
        ) : (
          <>
            <Form className="form" uiSchema={uiSchema} schema={dataSchema} onChange={this.log("changed")} onSubmit={this.onSubmit} onError={this.onError}>
              <div className="submit-cta">
                <Button type="submit" variant="primary">
                  Absenden
                </Button>
              </div>
            </Form>
          </>
        )}
      </div>
    );
  }
}
