/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import { Form } from "@rjsf/bootstrap-4";
import { FormProps } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import React from "react";
import { Alert } from "react-bootstrap";
import { sendData } from "../api/connector";
import "../css/CustomForm.css";

const schema: JSONSchema7 = {
  title: "CONspiracy Rundenanmeldung",
  description: "A simple form example.",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: {
      type: "string",
      title: "Vorname",
    },
    lastName: {
      type: "string",
      title: "Nachname",
    },
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
          <Form className="form" schema={schema} onChange={this.log("changed")} onSubmit={this.onSubmit} onError={this.onError} />
        )}
      </div>
    );
  }
}
