/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import { Theme as Bootstrap4Theme } from "@rjsf/bootstrap-4";
import { FormProps, withTheme } from "@rjsf/core";
import React from "react";
import { Alert, Button } from "react-bootstrap";
import { ArrowCounterclockwise } from "react-bootstrap-icons";
import { sendData } from "../../api/connector";
import "../../css/Form/Form.css";
import { ErrorListTemplate } from "./ErrorListTemplate";
import { dataSchema, uiSchema } from "./Schema";

const FormGenerator = withTheme(Bootstrap4Theme);

export class Form extends React.Component<{}, { completed: boolean; error: boolean }> {
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
        setting: data.formData.setting,
        players: data.formData.players,
        date: data.formData.date,
        notes: data.formData.notes || "keine",
        requirements: data.formData.requirements || "keine",
        table: data.formData.table || "nicht vorhanden",
        friendly: data.formData.friendly,
      });
    } catch (error) {
      this.apiError(error as Error);
    }

    this.setState({ completed: true });
  };

  apiError = (error?: Error) => {
    this.setState({ error: true });
    console.log(error);
  };

  onError = (error?: Error) => {
    console.log(error);
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
            <FormGenerator
              className="form"
              uiSchema={uiSchema}
              schema={dataSchema}
              onChange={this.log("changed")}
              onSubmit={this.onSubmit}
              onError={this.onError}
              ErrorList={ErrorListTemplate}
              showErrorList={true}
            >
              <div className="submit-cta">
                <Button type="submit" variant="primary">
                  Absenden
                </Button>
              </div>
            </FormGenerator>
          </>
        )}
      </div>
    );
  }
}
