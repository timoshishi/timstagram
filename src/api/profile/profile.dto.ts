import { IsUUID, IsString } from 'class-validator';

export class CreateProfileDTO {
  @IsString()
  bio: string;
}
