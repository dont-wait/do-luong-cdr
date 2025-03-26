CREATE TABLE Degree (
    id INT PRIMARY KEY,
    degree_name VARCHAR(255) NOT NULL
);

CREATE TABLE Department (
    id VARCHAR(255) PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);

CREATE TABLE Academic (
    id VARCHAR(255) PRIMARY KEY,
    academic_name VARCHAR(255) NOT NULL,
    academic_level INT NOT NULL,
    academic_type INT NOT NULL,
    department_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Department(id)
);

CREATE TABLE Lecturer (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL,
    degree_id INT NOT NULL,
    FOREIGN KEY (degree_id) REFERENCES Degree(id)
);

CREATE TABLE Student (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL,
    academic_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (academic_id) REFERENCES Academic(id)
);

CREATE TABLE Subject (
    id VARCHAR(255) PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    practical_credits INT NOT NULL,
    theoretical_credits INT NOT NULL,
    description TEXT,
    lecturer_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (lecturer_id) REFERENCES Lecturer(id)
);

CREATE TABLE Plo (
    id VARCHAR(255) PRIMARY KEY,
    plo_name VARCHAR(255) NOT NULL,
    plo_content TEXT NOT NULL,
    academic_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (academic_id) REFERENCES Academic(id)
);

CREATE TABLE Plo_detail (
    id VARCHAR(255) PRIMARY KEY,
    plo_detail_name VARCHAR(255) NOT NULL,
    plo_content TEXT NOT NULL,
    plo_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (plo_id) REFERENCES Plo(id)
);

CREATE TABLE Clo (
    id VARCHAR(255) PRIMARY KEY,
    clo_name VARCHAR(255) NOT NULL,
    clo_content TEXT NOT NULL,
    clo_parent_id VARCHAR(255),
    subject_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES Subject(id)
);

CREATE TABLE Plo_clo (
    plo_id VARCHAR(255) NOT NULL,
    clo_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (plo_id, clo_id),
    FOREIGN KEY (plo_id) REFERENCES Plo(id),
    FOREIGN KEY (clo_id) REFERENCES Clo(id)
);

CREATE TABLE Academic_subject (
    academic_id VARCHAR(255) NOT NULL,
    subject_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (academic_id, subject_id),
    FOREIGN KEY (academic_id) REFERENCES Academic(id),
    FOREIGN KEY (subject_id) REFERENCES Subject(id)
);

CREATE TABLE Class (
    id VARCHAR(255) PRIMARY KEY,
    subject_id VARCHAR(255) NOT NULL,
    lecturer_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES Subject(id),
    FOREIGN KEY (lecturer_id) REFERENCES Lecturer(id)
);

CREATE TABLE Exam (
    id VARCHAR(255) PRIMARY KEY,
    exam_name VARCHAR(255) NOT NULL,
    date_exam DATETIME DEFAULT NOW(),
    class_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (class_id) REFERENCES Class(id)
);

CREATE TABLE Question (
    id VARCHAR(255) PRIMARY KEY,
    question_name VARCHAR(255) NOT NULL,
    max_score FLOAT NOT NULL,
    exam_id VARCHAR(255) NOT NULL,
    clo_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES Exam(id),
    FOREIGN KEY (clo_id) REFERENCES Clo(id)
);

CREATE TABLE Result (
    id VARCHAR(255) PRIMARY KEY,
    score FLOAT,
    student_id VARCHAR(255) NOT NULL,
    question_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student(id),
    FOREIGN KEY (question_id) REFERENCES Question(id)
);

CREATE TABLE Role (
    id INT PRIMARY KEY,
    role_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE User_account (
    id VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    admin_id VARCHAR(255) UNIQUE,
    student_id VARCHAR(255) UNIQUE,
    lecturer_id VARCHAR(255) UNIQUE,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Role(id)
);

CREATE TABLE Admin (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) UNIQUE NOT NULL
);