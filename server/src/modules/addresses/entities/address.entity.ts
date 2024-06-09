import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "AddressID")')
export class AddressEntity {
  @Field(() => String)
  public AddressID: string;

  @Field(() => String)
  public UserID: string;

  @Field(() => String)
  public Phone: string;

  @Field(() => String)
  public ReceiverName: string;

  @Field(() => String)
  public Address: string;

  @Field(() => Boolean)
  public IsDefault: boolean;
}
