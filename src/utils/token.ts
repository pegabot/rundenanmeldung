/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

import { createSHA256 } from "./crypto";

export const createToken = (): string => {
  return createSHA256(new Date().toDateString() + process.env.REACT_APP_API_SECRET);
};

export const verifyToken = (token: string): boolean => (token === createToken() ? true : false);
