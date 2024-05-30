import {
  Directive,
  Field,
  GraphQLISODateTime,
  ObjectType,
} from '@nestjs/graphql';
import { Author as AuthorDB } from '@prisma/client';
import { IAuthor } from '../interfaces/author.interface';
import { IsBoolean, IsString } from 'class-validator';

@ObjectType()
@Directive('@key(fields: "AuthorID")')
export class AuthorEntity implements IAuthor {
  @Field(() => String)
  @IsString()
  public AuthorID: AuthorDB[`AuthorID`];

  @Field(() => String)
  @IsString()
  public AuthorName: AuthorDB[`AuthorName`];

  @Field(() => String)
  @IsString()
  public Bio: AuthorDB[`Bio`];
}
