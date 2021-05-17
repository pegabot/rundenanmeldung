/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import imaps from "imap-simple";
import _ from "lodash";
import { simpleParser } from "mailparser";
import { server } from "./server/server";

server.listen(process.env.PORT || 80, () => console.log(`💻 Webserver gestartet!`));

const config = {
  imap: {
    user: process.env.IMAP_EMAIL,
    password: process.env.IMAP_PASSWORT,
    host: process.env.IMAP_SERVER,
    port: 993,
    tls: true,
    authTimeout: 3000,
  },
};

// https://www.npmjs.com/package/imap-simple

imaps.connect(config).then(async (connection) => {
  await connection.openBox("INBOX");
  const messages = await connection.search(["UNSEEN"], { bodies: ["HEADER", "TEXT", ""], markSeen: false });

  for (const message of messages) {
    const all = _.find(message.parts, { which: "" });
    const id = message.attributes.uid;
    const idHeader = "Imap-Id: " + id + "\r\n";

    simpleParser(idHeader + all?.body, (err, mail) => {
      if (err) return;

      console.log(mail.subject);
      console.log(mail.html);
    });
  }
});
