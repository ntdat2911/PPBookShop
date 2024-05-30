import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TBook } from '../types/book.type';
import { BookEntity } from '../entities/book.entity';
@ObjectType()
export class GPaginatedBookResponse {
  @Field(() => Int)
  page: number;
  @Field(() => Int)
  size: number;
  @Field(() => Int)
  count: number;
  @Field(() => [BookEntity])
  records: OverviewDetailBook[];
}

@ObjectType()
export class OverviewDetailBook {
  @Field(() => String)
  public BookID: string;

  @Field(() => String)
  public BookTitle: string;

  @Field(() => String)
  public ImageURL: string;

  @Field(() => Number)
  public BookPrice: number;

  @Field(() => String)
  public AuthorBy: string;
}
