export interface AuthData {
  user: string;
  pwd: string;
  roles?: number[];
}

export interface AuthContextType {
  auth: AuthData | null;
  setAuth: (auth: AuthData | null) => void;
}

export interface FormData {
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

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "number";
  required?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  list?: boolean;
  width?: string;
  options?: string[];
}

export interface EntityConfig {
  name: string;
  fields: FieldConfig[];
  filterField?: string;
}

export interface AppState {
  currentEntityType: string;
  data: { [key: string]: Array<Record<string, unknown>> };
  currentItem: Record<string, unknown> | null;
  currentFilter: string;
  currentSearch: string;
  currentPage: number;
  itemsPerPage: number;
  isEditing: boolean;
  showModal: boolean;
  showDeleteModal: boolean;
}

export interface ExcelData {
  headers: string[];
  data: Array<Array<string | number | boolean>>;
  mergedCells: Array<{
    s: { r: number; c: number };
    e: { r: number; c: number };
  }>;
}
