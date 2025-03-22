import { Obj } from "../types/types";

export class CrudFormClass {
  constructor(
    public label: string,
    public type: string,
    public isRequired?: boolean,
    public isPrimaryKey?: boolean,
    public isDropBox?: boolean,
    public dataDrop?: Obj[],
    public dropLabel?: string,
    public isMutiple?: boolean,
    public filterLabel?: string,
    public dataFilter?: { [key: string]: string | number }[]
  ) {
    if (label) this.label = label;
    if (type) this.type = type;
    if (isRequired) this.isRequired = isRequired;
    if (isPrimaryKey) this.isPrimaryKey = isPrimaryKey;
    if (isDropBox) this.isDropBox = isDropBox;
    if (dataDrop) this.dataDrop = dataDrop;
    if (dropLabel) this.dropLabel = dropLabel;
    if (isMutiple) this.isMutiple = isMutiple;
    if (filterLabel) this.filterLabel = filterLabel;
    if (dataFilter) this.dataFilter = dataFilter;
  }
}
