import { MARKS } from './entity/Mark.entity';
import { Repository } from 'typeorm';
import { CreateMarksDto } from './DTO/Create.markDto';
import { UpdateMarksDto } from './DTO/Update.markDto';
import { TEACHERS } from '../Teacher/entity/Teacher.entity';
import { STUDENTS } from '../Student/entity/Student.entity';
import { PROJECT } from '../project/entities/project.entity';
export declare class MarkService {
    private markRepository;
    private teacherRepository;
    private studentRepository;
    private projectRepository;
    constructor(markRepository: Repository<MARKS>, teacherRepository: Repository<TEACHERS>, studentRepository: Repository<STUDENTS>, projectRepository: Repository<PROJECT>);
    getMarkDetailById(id: number): Promise<any>;
    getMarkStudentDetail(id: number): Promise<any>;
    getMarkTeacherDetail(id: number): Promise<any>;
    getMarkProjectDetail(id: number): Promise<any>;
    getAllDetail(): Promise<any>;
    findAll(): Promise<MARKS[]>;
    findOne(id: number): Promise<MARKS>;
    create(createMarksDto: CreateMarksDto): Promise<MARKS>;
    update(id: number, updateMarksDto: UpdateMarksDto): Promise<void>;
    remove(id: number): Promise<void>;
}
