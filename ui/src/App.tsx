/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import { Form } from "@rjsf/bootstrap-4";
import { FormProps } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import React from "react";
import { sendData } from "./api/connector";
import "./css/App.css";

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

const log = (type: any) => console.log.bind(console, type);

const submit = (data: FormProps<any>) => {
  sendData({
    name: `${data.formData.firstName} ${data.formData.lastName}`,
  });
  console.log(data);
};

function App() {
  return (
    <div className="App">
      <Form className="form" schema={schema} onChange={log("changed")} onSubmit={submit} onError={log("errors")} />
    </div>
  );
}

export default App;
