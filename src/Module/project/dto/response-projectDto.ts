import { STUDENTS } from "src/Module/Student/entity/Student.entity";
import { TEACHERS } from "src/Module/Teacher/entity/Teacher.entity";


export class ProjectResponseDto{

    id: number;
    title: string;
    marks:number;
    subject: string;
    students: STUDENTS[];
    teachers: TEACHERS[];

}