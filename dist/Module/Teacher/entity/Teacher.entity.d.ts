import { PROJECT } from "src/Module/project/entities/project.entity";
import { STUDENTS } from "src/Module/Student/entity/Student.entity";
export declare class TEACHERS {
    id: number;
    NAME: string;
    SUBJECT: string;
    student: STUDENTS[];
    project: PROJECT[];
}
