export interface AuthData {
  user: string;
  role?: number;
  accessToken?: string;
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

export interface Field {
  name: string; // - Field name (used as form field ID)
  label: string; // - Display label
  type: string; // - Input type (text, number, select, checkbox, etc.)
  required?: boolean; // - Whether the field is required
  defaultValue?: string | number; // - Default value for the field
  options?: object[]; // - Options for select fields;
  validation?: object; // - Validation rules
  isNumber?: boolean;
}

export interface CrudFormProps {
  formType: string; //- Type of form (basic, checkbox, hierarchical)
  title: string; // - Form title
  fields: Field[]; // - Field definitions
  onSubmit: (data: object[]) => void; // - Submit handler
  apiEndpoint: string; // - API endpoint for submissions
  existingData?: object[]; // - Existing data for checkbox form
  parentData?: object[]; // - Parent data for hierarchical form
  parentDisplayField?: string; // - Field to display from parent data
  childRelationField?: string; //  Field linking child to parent
  childApiEndpoint?: string; // - API endpoint for fetching child data
  initialValues?: object; // - Initial form values
}

export interface ColumnDefinition {
  key: string;
  label: string;
}

export interface DataTableProps {
  data: object[];
  setData: (data: object[]) => void;
  title: string;
  columns: ColumnDefinition[];
  apiEndpoint: string;
  refreshTrigger: number;
  showActions?: boolean;
}

export const FormType = {
  BASIC: "basic",
  CHECKBOX: "checkbox",
  HIERARCHICAL: "hierarchical",
};
