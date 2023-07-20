/* import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  username: string;

  // Add any other properties you want to include for creating a user
}
 */
// auth-login.dto.ts

import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @Length(6, 30, { message: 'Password must be between 6 and 30 characters' })
  password: string;

  // Custom method to validate the DTO
  validate(): { error?: string; value: CreateUserDto } {
    const errors = [];

    // Add your custom validation logic here
    // For example, you can check for email uniqueness or other constraints
    // If any validation fails, you can push error messages into the 'errors' array

    if (errors.length > 0) {
      return { error: errors.join(', '), value: null };
    }

    return { value: this };
  }
}
