/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import { Theme as Bootstrap4Theme } from "@rjsf/bootstrap-4";
import { FormProps, withTheme } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import React from "react";
import { Alert } from "react-bootstrap";
import { sendData } from "../api/connector";
import "../css/CustomForm.css";

const Form = withTheme(Bootstrap4Theme);

const dataSchema: JSONSchema7 = {
  type: "object",
  properties: {
    sl: {
      type: "string",
      title: "Spielleitung (Discord Name)",
    },
    system: {
      type: "string",
      title: "System",
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
    numberOfPlayers: {
      type: "number",
      title: "Wie viele Spieler können teilnehmen?",
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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

  onSubmit = async (data: FormProps<any>) => {
    try {
      await sendData({
        name: `${data.formData.firstName} ${data.formData.lastName}`,
      });
    } catch (error) {
      this.onError();
    }

    this.setState({ completed: true });
    console.log(data);
  };

  onError = () => {
    this.setState({ error: true });
  };

  render() {
    return (
      <div className="container">
        {this.state.error ? (
          <Alert variant="danger">Ein Fehler ist aufgetreten, bitte versuche es später erneut!</Alert>
        ) : this.state.completed ? (
          <Alert variant="success">Vielen Dank für deine Einsendung!</Alert>
        ) : (
          <Form className="form" uiSchema={uiSchema} schema={dataSchema} onChange={this.log("changed")} onSubmit={this.onSubmit} onError={this.onError} />
        )}
      </div>
    );
  }
}
