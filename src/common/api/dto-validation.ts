import { IsString, IsDateString, IsUUID, MaxLength, IsOptional, ValidateNested } from 'class-validator';
import { IsNullable } from './api-decorators';

class AppMetadata {
  @IsString()
  provider: string;

  @MaxLength(20, {
    each: true,
  })
  providers: string[];
}

export class SupaUserDTO {
  @IsUUID()
  id: string;

  @IsString()
  aud: string;

  @IsString()
  role: string;

  @IsString()
  email: string;

  @IsDateString()
  @IsNullable()
  email_confirmed_at: string;

  @IsString()
  phone: string;

  @IsDateString()
  confirmation_sent_at: string;

  @IsDateString()
  confirmed_at: string;

  @IsDateString()
  last_sign_in_at: string;

  @ValidateNested()
  app_metadata: AppMetadata;

  @IsOptional()
  user_metadata: {};
  identities: Identity[];

  @IsDateString()
  created_at: string;

  @IsDateString()
  updated_at: string;
}

class Identity {
  @IsUUID()
  id: string;

  @IsUUID()
  user_id: string;

  @ValidateNested()
  identity_data: IdentityData;

  @IsString()
  provider: string;

  @IsDateString()
  last_sign_in_at: string;

  @IsDateString()
  created_at: string;

  @IsDateString()
  updated_at: string;
}

export class IdentityData {
  @IsString()
  sub: string;
}
