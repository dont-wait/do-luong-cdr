import { PartialType } from "@nestjs/mapped-types";
import { CreateClassStudentDto } from "./createClassStudent.dto";

export class UpdateClassStudentDto extends PartialType(CreateClassStudentDto) {}