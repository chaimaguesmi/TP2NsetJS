import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,  
  ) {}
  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(createSkillDto);
    return await this.skillRepository.save(skill);
  }

  async findAll(): Promise<Skill[]> {
    return await this.skillRepository.find();
  }

  async findOne(id: number): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new Error(`Skill with id ${id} not found`);
    }
    return skill;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(id);  
    Object.assign(skill, updateSkillDto);   
    return await this.skillRepository.save(skill);  
  }


  async remove(id: number): Promise<void> {
    const skill = await this.findOne(id);  
    await this.skillRepository.remove(skill);  
  }
}
