import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { CvService } from '../cv/cv.service';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateCvDto } from '../cv/dto/create-cv.dto';

import { randFirstName, randLastName, randJobTitle, randNumber, randEmail, randSkill } from '@ngneat/falso';
import { CreateSkillDto } from '../skills/dto/create-skill.dto';
import { SkillsService } from '../skills/skills.service';

async function bootstrap() {
  
  const app = await NestFactory.createApplicationContext(AppModule);

  
  const userService = app.get(UserService);
  const cvService = app.get(CvService);
  const skillService = app.get(SkillsService);

 
  console.log('Seeding Users...');
  for (let i = 0; i < 10; i++) {
    const createUserDto: CreateUserDto = {
      username: `${randFirstName()}${randLastName()}`,
      email: randEmail(),
      password: 'password123',
    };
    const user = await userService.create(createUserDto);

   
    console.log(`Seeding CVs for User ${user.id}...`);
    for (let j = 0; j < 3; j++) {
      const createCvDto: CreateCvDto = {
        name: randLastName(),
        firstname: randFirstName(),
        age: randNumber({ min: 18, max: 60 }),
        cin: `CIN${randNumber({ min: 1000, max: 9999 })}`,
        job: randJobTitle(),
        path: `/uploads/cv-${j + 1}.pdf`,
        userId: user.id,
      };
      const cv = await cvService.create(createCvDto);

      
      console.log(`Seeding Skills for CV ${cv.id}...`);
      for (let k = 0; k < 5; k++) {
        const createSkillDto: CreateSkillDto = {
          designation: randSkill(),
        };
        const skill = await skillService.create(createSkillDto);

        
        cv.skills = [...(cv.skills || []), skill];
        await cvService.update(cv.id, { ...cv });
      }
    }
  }

  console.log('Seeding complete!');

  
  await app.close();
}

bootstrap();
