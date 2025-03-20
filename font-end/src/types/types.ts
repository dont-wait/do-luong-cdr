export interface AuthData {
  user: string;
  pwd: string;
  roles?: number[];
}

export interface AuthContextType {
  auth: AuthData | null;
  setAuth: (auth: AuthData | null) => void;
}

export interface AccountData {
  email: string;
  password: string;
  remember: boolean;
}

// input prop
export interface InputFieldProps {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  ref?: React.Ref<HTMLInputElement>;
  required?: boolean;
  showPasswordToggle?: () => void;
  showPasswordIcon?: boolean;
}

export interface CheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export interface Toast {
  id: number;
  message: string;
  type: "error" | "success";
}

export interface FormattedCell {
  isHeading?: boolean;
  value: string | number | null;
  rowspan?: number;
  colspan?: number;
}

export interface MergedCell {
  s: { r: number; c: number };
  e: { r: number; c: number };
}

export interface Obj {
  [key: string]: string;
}

export interface CrudFromField {
  label: string;
  type: string;
  isPrimaryKey?: boolean;
  isRequired?: boolean;
  isDropBox?: boolean;
  dataDrop?: Obj[];
  dropLabel?: string;
}
