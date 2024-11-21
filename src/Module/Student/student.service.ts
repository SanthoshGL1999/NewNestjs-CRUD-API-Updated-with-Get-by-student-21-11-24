import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { STUDENTS } from './entity/Student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './DTO/Create.StudentDto';
import { UpdateStudentDto } from './DTO/Update.studentDto';
import { TEACHERS } from '../Teacher/entity/Teacher.entity';
import { MARKS } from '../Mark/entity/Mark.entity';
import { PROJECT } from '../project/entities/project.entity';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(STUDENTS)
                private studentRepository: Repository<STUDENTS>,
                @InjectRepository(TEACHERS)
                private teacherRepository: Repository<TEACHERS>,
                @InjectRepository(MARKS) 
                private markRepository: Repository<MARKS>,
                @InjectRepository(PROJECT) 
                private projectRepository: Repository<PROJECT>,
                ){}

                async getStudentDetailsById(id: number): Promise<any> {
                    const student = await this.studentRepository.findOne({ where: { id } });
                    if (!student) {
                        throw new NotFoundException(`Student with ID ${id} not found`);
                    }
                    const teacher = student.id
                        ? await this.teacherRepository.findOne({ where: { id: student.id } })
                        : null;
                    const marks = student.id
                        ? await this.markRepository.findOne({ where: { id: student.id} })
                        : null;
                    const projects = student.id
                        ? await this.projectRepository.findOne({ where: { id: student.id} })
                        : null;
                    return {
                        student: {
                            id: student.id,
                            name: student.NAME,
                            age: student.AGE,
                            course: student.COURSE,
                            grade: student.GRADE,
                            class_teacher: student.CLASS_TEACHER,
                        },
                        teacher: teacher
                            ? {
                                  id: teacher.id,
                                  name: teacher.NAME,
                              }
                            : null,
                        mark: marks
                            ? {
                                id: marks.id,
                                tamil: marks.TAMIL,
                                english: marks.ENGLISH,
                                maths: marks.MATHS,
                                science: marks.SCIENCE,
                                social_science: marks.SOCIAL_SCIENCE,
                            }
                            :null,
                        project: projects
                            ?{
                                id: projects.id,
                                title: projects.TITLE,
                                project_subject: projects.PROJECT_SUBJECT,
                                project_mark: projects.PROJECT_MARKS,
                            }
                            :null,
                    };
                }

    async getStudentTeacherDetails(id: number): Promise<any> {
        const students = await this.studentRepository.findOne({where:{id}});
        if (!students) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        const teacher = students.id 
            ? await this.teacherRepository.findOne({ where: { id: students.id } }) 
            : null;
        return {
            ...students,
            teacher: teacher
            ? { id: teacher.id, name: teacher.NAME }
            : null,
        };
    }

    async getStudentMarkDetails(id: number): Promise<any> {
        const students = await this.studentRepository.findOne({where:{id}});
        if (!students) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        const mark = students.id 
            ? await this.markRepository.findOne({ where: { id: students.id } }) 
            : null;
        return {
            ...students,
            marks: mark
            ? { id: mark.id, tamil: mark.TAMIL, english: mark.ENGLISH, maths: mark.MATHS, science: mark.SCIENCE, social_science: mark.SOCIAL_SCIENCE }
            : null,
        };
    }

    async getStudentProjectDetail(id: number): Promise<any> {
        const student= await this.studentRepository.findOne({where: { id }});
        if(!student){
            throw new NotFoundException(`student with id ${id} not found`);
        }
        const project= student.id
        ? await this.projectRepository.findOne({where: { id }})
        : null;
        return{
            ...student,
            projects: project
            ? {id: project.id, title: project.TITLE, project_subject: project.PROJECT_SUBJECT, project_mark: project.PROJECT_MARKS} 
            : null,
        }
    }

    async getAllDetails(): Promise<any> {

        const students = await this.studentRepository.find();
        const teachers = await this.teacherRepository.find();
        const marks = await this.markRepository.find();
        const projects = await this.projectRepository.find();
        const combinedData = students.map((student) => {
            const teacher = teachers.find((t) => t.id === student.id);
            const mark = marks.find((m) => m.id === student.id);
            const project = projects.find((p) => p.id === student.id);
            return {
                ...student,
                teacher: teacher ? { id: teacher.id, name: teacher.NAME } : null,
                mark: mark ? { id: mark.id, tamil: mark.TAMIL, english: mark.ENGLISH, maths: mark.MATHS, science: mark.SCIENCE, social_science: mark.SOCIAL_SCIENCE } : null,
                project: project ? { id: project.id, title: project.TITLE, project_subject: project.PROJECT_SUBJECT, project_mark: project.PROJECT_MARKS } : null,
            }
        });

        return combinedData;
    }
    
    findAll():Promise<STUDENTS[]>{
        return this.studentRepository.find();
    }

    findOne(id: number):Promise<STUDENTS>{
        return this.studentRepository.findOneBy({id});
    }

    create(createStudentDto: CreateStudentDto): Promise<STUDENTS>{
        return this.studentRepository.save(createStudentDto);
    }

    async update(id: number,updateStudentDto: UpdateStudentDto): Promise<void>{
        await this.studentRepository.update(id,updateStudentDto);
    }
    
    async remove(id: number): Promise<void>{
        await this.studentRepository.delete(id)
    }
}
