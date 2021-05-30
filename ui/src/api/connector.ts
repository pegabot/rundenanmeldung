/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import axios from "axios";
import { Card } from "../../../src/types/trello";

const apiURL = process.env.API_URL || "";

export const sendData = async (data: Card) => {
  return await axios.post(`${apiURL}/api/session`, data);
};
