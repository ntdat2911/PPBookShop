import {
  Directive,
  Field,
  GraphQLISODateTime,
  ObjectType,
} from '@nestjs/graphql';
import { Book as BookDB } from '@prisma/client';
import { IBook } from '../interfaces/book.interface';
import { IsBoolean, IsString } from 'class-validator';

@ObjectType()
@Directive('@key(fields: "BookID")')
export class BookEntity implements IBook {
  @Field(() => String)
  @IsString()
  public BookID: BookDB[`BookID`];

  @Field(() => String)
  @IsString()
  public ImageURL: BookDB[`ImageURL`];

  @Field(() => String)
  @IsString()
  public BookTitle: BookDB[`BookTitle`];

  @Field(() => String)
  @IsString()
  public BookDescription: BookDB[`BookDescription`];

  @Field(() => Number)
  public BookPrice: BookDB[`BookPrice`];

  @Field(() => String)
  @IsString()
  public CategoryID: BookDB[`CategoryID`];

  @Field(() => String)
  @IsString()
  public AuthorBy: BookDB[`AuthorBy`];

  @Field(() => Date)
  public PublishDate: BookDB[`PublishDate`];

  @Field(() => Boolean)
  public IsBookActive: BookDB[`IsBookActive`];

  @Field(() => Boolean)
  @IsBoolean()
  public IsOutOfStock: BookDB[`IsOutOfStock`];

  @Field(() => Number)
  public Rating: BookDB[`Rating`];

  @Field(() => GraphQLISODateTime)
  public CreatedAt: BookDB[`CreatedAt`];

  @Field(() => GraphQLISODateTime)
  public UpdatedAt: BookDB[`UpdatedAt`];
}
