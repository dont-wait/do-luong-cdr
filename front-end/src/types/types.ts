export interface AuthData {
  user: string;
  role?: number;
}

export interface AuthContextType {
  auth: AuthData | null;
  setAuth: (auth: AuthData | null) => void;
}

export interface AccountData {
  id: string;
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
  [key: string]: string | number;
}

export interface CrudFromField {
  key: string;
  label: string;
  type: string;
  isRequired?: boolean;
  isDropBox?: boolean;
  dataDrop?: Obj[];
  dropLabel?: string;
  isMultiple?: boolean;
  isVisible?: boolean;
  defaultValue?: string | number;
}

export interface ErrorResponse {
  details?: {
    message: string;
  };
}

export interface Subject {
  id: string;
  subject_name: string;
  practical_credits: number;
  theoretical_credits: number;
  description: string;
  lecturer_subject_manager_id: string;
}

export interface Lecturer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  degree_id: number;
  academic_id: string;
  subjects: Subject[];
  LecturerSubject: {
    lecturer_id: string;
    subject_id: string;
  }[];
}

export interface Academic {
  id: string;
  academic_name?: string;
  academic_level?: number;
  academic_type?: number;
  department_id?: string;
}

export interface Degree {
  id: number;
  degree_name: string;
}
