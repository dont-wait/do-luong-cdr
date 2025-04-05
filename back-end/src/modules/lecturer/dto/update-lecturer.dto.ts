import { PartialType } from "@nestjs/mapped-types";
import { CreateLecturerDto } from "./create-lecturer.dto";

export class UpdateLecturer extends PartialType(CreateLecturerDto){}