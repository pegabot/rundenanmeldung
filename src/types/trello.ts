/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */

export type Card = {
  title: string;
  desc: string;
  gamemaster: string;
  system: string;
  setting: string;
  players: number;
  date: string;
  notes: string;
  requirements: string;
  table: string;
  friendly: string;
};
