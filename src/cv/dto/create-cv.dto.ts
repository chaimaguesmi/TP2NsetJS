import { IsString, IsInt } from 'class-validator';
export class CreateCvDto {
    @IsString()
    name: string;
  
    @IsString()
    firstname: string;
  
    @IsInt()
    age: number;
  
    @IsString()
    cin: string;
  
    @IsString()
    job: string;
  
    @IsString()
    path: string;
    @IsInt()
    userId: number;
}
