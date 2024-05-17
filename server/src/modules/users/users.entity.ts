import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { User as UserDB } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int)
  UserID: UserDB[`UserID`];

  @Field(() => String)
  ImageURL: UserDB[`ImageURL`];

  @Field(() => String)
  UserName: UserDB[`UserName`];

  @Field(() => String)
  Password: UserDB[`Password`];

  @Field(() => String)
  Email: UserDB[`Email`];

  @Field(() => String)
  Role: UserDB[`Role`];

  @Field(() => Boolean)
  IsUserActive: UserDB[`IsUserActive`];

  @Field(() => GraphQLISODateTime)
  CreatedAt: UserDB[`CreatedAt`];

  @Field(() => GraphQLISODateTime)
  UpdatedAt: UserDB[`UpdatedAt`];
}
