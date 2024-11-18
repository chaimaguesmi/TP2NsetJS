import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skills/entities/skill.entity';


@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: string;

  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne(() => User, (user) => user.cvs)
  user: User;

  @ManyToMany(() => Skill, (skill) => skill.cvs)
  @JoinTable({
  name: 'cv_skills',  // Nom de la table de jointure
  joinColumn: { name: 'cv_id', referencedColumnName: 'id' },
  inverseJoinColumn: { name: 'skill_id', referencedColumnName: 'id' },
  })
  skills: Skill[];

}
