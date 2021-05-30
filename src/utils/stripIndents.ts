/*
 * Copyright (c) 2020 - 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/discord/blob/main/LICENSE for details)
 */

export const stripIndents = (input: string): string => {
  return typeof input === "string" ? input.replace(/^[ \\t]+/gm, "") : input;
};
