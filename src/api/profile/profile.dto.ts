import { IsUUID, IsString } from 'class-validator';
// class UserDataDTO {
//   @Type(() => SupaUserDTO)
//   @ValidateNested()
//   @IsNullable()
//   user: SupaUserDTO | null;

//   @IsNullable()
//   profile: null;
// }

// class UpdateProfileDTO {
//   @Type(() => UserDataDTO)
//   @ValidateNested()
//   user: UserDataDTO;

//   @IsString()
//   @MaxLength(20)
//   @MinLength(3)
//   username: string;

//   @IsString()
//   avatarUrl: string;
// }

export class CreateProfileDTO {
  @IsUUID()
  id: string;

  @IsString()
  username: string;
}
