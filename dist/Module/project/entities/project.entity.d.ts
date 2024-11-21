import { STUDENTS } from "src/Module/Student/entity/Student.entity";
import { TEACHERS } from "src/Module/Teacher/entity/Teacher.entity";
export declare class PROJECT {
    id: number;
    TITLE: string;
    PROJECT_SUBJECT: string;
    PROJECT_MARKS: number;
    student: STUDENTS[];
    teacher: TEACHERS[];
}
