import { Obj } from "../types/types";

interface CrudFormOptions {
  label: string;
  type: string;
  isRequired?: boolean;
  isPrimaryKey?: boolean;
  isDropBox?: boolean;
  dataDrop?: Obj[];
  dropLabel?: string;
  isMultiple?: boolean;
}

export class CrudFormClass {
  readonly label: string;
  readonly type: string;
  readonly isRequired: boolean;
  readonly isPrimaryKey: boolean;
  readonly isDropBox: boolean;
  readonly dataDrop?: Obj[];
  readonly dropLabel?: string;
  readonly isMultiple: boolean;

  constructor(options: CrudFormOptions) {
    this.label = options.label;
    this.type = options.type;
    this.isRequired = options.isRequired ?? false;
    this.isPrimaryKey = options.isPrimaryKey ?? false;
    this.isDropBox = options.isDropBox ?? false;
    this.dataDrop = options.dataDrop;
    this.dropLabel = options.dropLabel;
    this.isMultiple = options.isMultiple ?? false;
  }

  static create(options: CrudFormOptions): CrudFormClass {
    return new CrudFormClass(options);
  }
}
