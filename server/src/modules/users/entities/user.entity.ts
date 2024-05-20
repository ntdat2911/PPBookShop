import {
  Directive,
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { User as UserDB } from '@prisma/client';
import { IUser } from '../interfaces/user.interface';
import { IsBoolean, IsEmail, IsString, Length, Matches } from 'class-validator';
import {
  BCRYPT_HASH,
  NAME_REGEX,
  SLUG_REGEX,
} from 'src/modules/common/consts/regex.const';

@ObjectType()
@Directive('@key(fields: "UserID")')
export class UserEntity implements IUser {
  @Field(() => String)
  public UserID: UserDB[`UserID`];

  @Field(() => String)
  public ImageURL: UserDB[`ImageURL`];

  @Field(() => String)
  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX, {
    message: 'Name must not have special characters',
  })
  public Name: string;

  @Field(() => String)
  @IsString()
  @Length(3, 106)
  @Matches(SLUG_REGEX, {
    message: 'Username must be a valid slugs',
  })
  public UserName: UserDB[`UserName`];

  @Field(() => String)
  @IsString()
  @Length(59, 60)
  @Matches(BCRYPT_HASH)
  public Password: UserDB[`Password`];

  @Field(() => String)
  @IsString()
  @IsEmail()
  @Length(5, 255)
  public Email: UserDB[`Email`];

  @Field(() => Boolean)
  @IsBoolean()
  public IsUserActive: UserDB[`IsUserActive`];

  @Field(() => Boolean)
  @IsBoolean()
  public IsEmailConfirmed: UserDB[`IsEmailConfirmed`];

  @Field(() => GraphQLISODateTime)
  public CreatedAt: UserDB[`CreatedAt`];

  @Field(() => GraphQLISODateTime)
  public UpdatedAt: UserDB[`UpdatedAt`];
}
