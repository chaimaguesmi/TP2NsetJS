import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createCvDto: CreateCvDto): Promise<Cv> {
    const user = await this.userRepository.findOneBy({ id: createCvDto.userId });
    if (!user) {
      throw new Error(`User with ID ${createCvDto.userId} not found`);
    }
    const newCv = this.cvRepository.create({
      ...createCvDto,
      user, 
    });

    return await this.cvRepository.save(newCv);
  }
  async findAll(): Promise<Cv[]> {
    return this.cvRepository.find();
  }

  async findOne(id: number): Promise<Cv> {
    return this.cvRepository.findOne({
      where: { id },  
    });
  }

  async update(id: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    const cv = await this.cvRepository.findOne({ where: { id } });

    if (!cv) {
      throw new Error(`CV with id ${id} not found`);
    }

    Object.assign(cv, updateCvDto);  
    return this.cvRepository.save(cv);  
  }

 
  async remove(id: number): Promise<void> {
    const cv = await this.cvRepository.findOne({ where: { id } });

    if (!cv) {
      throw new Error(`CV with id ${id} not found`);
    }

    await this.cvRepository.remove(cv);  
  }
}
