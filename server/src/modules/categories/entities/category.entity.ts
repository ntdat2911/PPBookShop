import {
  Directive,
  Field,
  GraphQLISODateTime,
  ObjectType,
} from '@nestjs/graphql';
import { ICategory } from '../interfaces/category.interface';

@ObjectType()
@Directive('@key(fields: "CategoryID")')
export class CategoryEntity implements ICategory {
  @Field(() => String)
  public CategoryID: string;

  @Field(() => String)
  public CategoryName: string;

  @Field(() => Boolean)
  public IsCategoryActive: boolean;

  @Field(() => GraphQLISODateTime)
  public CreatedAt: Date;

  @Field(() => GraphQLISODateTime)
  public UpdatedAt: Date;
}
