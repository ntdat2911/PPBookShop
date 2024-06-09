import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
import { Public } from '../auth/decorators/public.decorator';
import { AddressEntity } from './entities/address.entity';
import { Query } from '@nestjs/graphql'; // Import the Query decorator
@Resolver()
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Public()
  @Query(() => [AddressEntity])
  async getAddressesByUserId(@Args('userId') userId: string) {
    return this.addressesService.getAddressesByUserId(userId);
  }

  @Public()
  @Mutation(() => AddressEntity)
  async createAddress(
    @Args('userId') UserID: string,
    @Args('phone') Phone: string,
    @Args('receiverName') ReceiverName: string,
    @Args('address') Address: string,
    @Args('isDefault') IsDefault: boolean,
  ) {
    return this.addressesService.createAddress({
      UserID,
      Phone,
      ReceiverName,
      Address,
      IsDefault,
    });
  }

  @Public()
  @Mutation(() => AddressEntity)
  async updateAddress(
    @Args('addressId') AddressID: string,
    @Args('phone') Phone: string,
    @Args('receiverName') ReceiverName: string,
    @Args('address') Address: string,
    @Args('isDefault') IsDefault: boolean,
  ) {
    return this.addressesService.updateAddress({
      AddressID,
      Phone,
      ReceiverName,
      Address,
      IsDefault,
    });
  }
}
