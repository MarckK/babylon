// @flow

import { lineBreakG } from "./whitespace";

export type Pos = {
  start: number,
};

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

export type Position = {
  line: number,
  column: number,
};

export type SourceLocation = {
  start: Position,
  end: Position,
  filename?: string,
  identifierName?: string,
};

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

export function getLineInfo(input: string, offset: number): Position {
  for (let line = 1, cur = 0; ; ) {
    lineBreakG.lastIndex = cur;
    const match = lineBreakG.exec(input);
    if (match && match.index < offset) {
      ++line;
      cur = match.index + match[0].length;
    } else {
      return {
        line,
        column: offset - cur,
      };
    }
  }
  // istanbul ignore next
  throw new Error("Unreachable");
}
