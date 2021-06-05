/*
 * Copyright (c) 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/rundenanmeldung/blob/main/LICENSE for details)
 */
import { ErrorListProps } from "@rjsf/core";

export const ErrorListTemplate = (props: ErrorListProps) => {
  const { errors } = props;
  return (
    <div className="mb-4 card border-danger" role="alert">
      <div className="alert-danger card-header">Fehler</div>
      <div className="p-0 card-body">
        <div className="list-group">
          {errors.map((error: Error) => (
            <div className="border-0 list-group-item" key={error.stack || ""}>
              <span>{error.stack || ""}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
