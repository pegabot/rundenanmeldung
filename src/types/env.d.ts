/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

declare namespace NodeJS {
  interface ProcessEnv {
    TRELLO_API_KEY: string;
    TRELLO_OAUTH_TOKEN: string;
    REACT_APP_API_TOKEN: string;
  }
}
