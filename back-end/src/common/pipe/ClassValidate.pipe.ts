import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { CreateClassDto } from "src/modules/class/dto/create-class.dto";
import { PrismaService } from "src/modules/prisma/Prisma.service";

@Injectable()
export class ClassValidatePipe implements PipeTransform {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async transform(value: CreateClassDto | CreateClassDto[], metadata: ArgumentMetadata): Promise<CreateClassDto | CreateClassDto[]> {
        try {
            if (Array.isArray(value)) {
                await Promise.all(value.map(item => this.validateClass(item)));
                return value;
            }
            await this.validateClass(value);
            return value;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    private async validateClass(classData: CreateClassDto): Promise<void> {
        const [existingClass, subjectExist, lecturerExist] = await Promise.all([
            this.prisma.class.findUnique({ where: { id: classData.id } }),
            this.prisma.subject.findUnique({ where: { id: classData.subject_id } }),
            this.prisma.lecturer.findUnique({ where: { id: classData.lecturer_id } })
        ]);

        if (existingClass) {
            throw new BadRequestException(`Class ID ${classData.id} already exists`);
        }
        
        if (!subjectExist) {
            throw new BadRequestException(`Subject ID ${classData.subject_id} not found`);
        }
        
        if (!lecturerExist) {
            throw new BadRequestException(`Lecturer ID ${classData.lecturer_id} not found`);
        }
    }
}