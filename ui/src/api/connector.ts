/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import axios, { AxiosResponse } from "axios";
import { Card } from "../../../src/types/trello";

export const sendData = async (data: Card): Promise<AxiosResponse<any>> => {
  return await axios.post(`/api/card`, data, { headers: { token: process.env.REACT_APP_API_TOKEN } });
};
