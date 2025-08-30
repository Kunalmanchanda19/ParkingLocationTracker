declare module "papaparse" {
  export interface ParseResult<T> {
    data: T[];
    errors: any[];
    meta: any;
  }

  export function parse<T = any>(
    file: File | string,
    options: {
      header?: boolean;
      skipEmptyLines?: boolean;
      complete?: (results: ParseResult<T>) => void;
    }
  ): void;

  export default {
    parse: parse,
  };
}
