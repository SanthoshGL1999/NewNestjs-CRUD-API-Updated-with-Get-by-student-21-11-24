import { STUDENTS } from "src/Module/Student/entity/Student.entity";
import { TEACHERS } from "src/Module/Teacher/entity/Teacher.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PROJECT {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TITLE: string;

    @Column()
    PROJECT_SUBJECT: string;

    @Column()
    PROJECT_MARKS: number;

    @ManyToMany(()=>STUDENTS,(student)=> student.project, { cascade: true })
    @JoinTable({
        name: 'project',
        joinColumn: { name: 'id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'STUDENT_ID', referencedColumnName: 'id' }
      })
    student: STUDENTS[];
    @ManyToMany(()=>TEACHERS,(teacher)=> teacher.project, { cascade: true })
    @JoinTable({
        name: 'project',
        joinColumn: { name: 'id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'STUDENT_ID', referencedColumnName: 'id' }
      })
    teacher: TEACHERS[];
}
