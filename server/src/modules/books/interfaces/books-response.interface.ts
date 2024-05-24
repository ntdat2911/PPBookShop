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
  records: BookEntity[];
}
