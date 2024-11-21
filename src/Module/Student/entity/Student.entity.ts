import { MARKS } from "src/Module/Mark/entity/Mark.entity";
import { PROJECT } from "src/Module/project/entities/project.entity";
import { TEACHERS } from "src/Module/Teacher/entity/Teacher.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class STUDENTS{
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    NAME: string;

    @Column()
    AGE: number;

    @Column()
    COURSE: string;
    
    @Column()
    GRADE: string;

    @Column()
    CLASS_TEACHER: number;

    @ManyToMany(()=> TEACHERS,(teacher)=> teacher.student)
    @JoinColumn({name: 'teacherid'})
    teacher: TEACHERS;

    @ManyToMany(()=> MARKS,(marks)=> marks.students)
    marks: MARKS[];

    @ManyToMany(()=> PROJECT,(project)=> project.student)
    project: PROJECT[];


}