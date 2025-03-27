import { Obj, CrudFromField } from "../types/types";
export class CrudFormClass {
  readonly key: string;
  readonly label: string;
  readonly type: string;
  readonly isRequired?: boolean;
  readonly isDropBox?: boolean;
  readonly dataDrop?: Obj[];
  readonly dropLabel?: string;
  readonly isMultiple: boolean;
  readonly isVisible: boolean;

  constructor(options: CrudFromField) {
    this.key = options.key;
    this.label = options.label;
    this.type = options.type;
    this.isRequired = options.isRequired ?? false;
    this.isDropBox = options.isDropBox ?? false;
    this.dataDrop = options.dataDrop;
    this.dropLabel = options.dropLabel;
    this.isMultiple = options.isMultiple ?? false;
    this.isVisible = options.isVisible ?? false;
  }

  static create(options: CrudFromField): CrudFormClass {
    return new CrudFormClass(options);
  }
}
