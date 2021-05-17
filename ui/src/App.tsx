/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import { Form } from "@rjsf/bootstrap-4";
import { JSONSchema7 } from "json-schema";
import React from "react";
import "./App.css";

const schema: JSONSchema7 = {
  title: "A registration form",
  description: "A simple form example.",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: {
      type: "string",
      title: "First name",
      default: "Chuck",
    },
    lastName: {
      type: "string",
      title: "Last name",
    },
    telephone: {
      type: "string",
      title: "Telephone",
      minLength: 10,
    },
  },
};

const log = (type: any) => console.log.bind(console, type);

function App() {
  return (
    <div className="App">
      <Form schema={schema} onChange={log("changed")} onSubmit={log("submitted")} onError={log("errors")} />
    </div>
  );
}

export default App;
