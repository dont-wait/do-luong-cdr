type UserAccountResponseData = {
    id: string;
    password: string;
    admin_id: string | null;
    student_id: string | null;
    lecturer_id: string;
    role_id: number;
    admin: string | null;
    lecturer: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        degree_id: number;
        academic_id: string;
    };
    role: {
        id: number;
        role_name: string
    };
    access_token: string;
}