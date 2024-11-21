

import { PROJECT } from "src/Module/project/entities/project.entity";
import { STUDENTS } from "src/Module/Student/entity/Student.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TEACHERS{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    NAME: string;

    @Column()
    SUBJECT: string;

    @ManyToMany(()=> STUDENTS,(student)=> student.teacher)
    student: STUDENTS[];

    @ManyToMany(()=>PROJECT,(project)=> project.teacher)
    project: PROJECT[];

}