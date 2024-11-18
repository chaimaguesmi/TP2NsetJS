import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { Cv } from './entities/cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { Skill } from '../skills/entities/skill.entity';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cv,User,Skill]),
  UserModule,
  SkillsModule],

  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
