import { Injectable } from '@nestjs/common';
import { AddressesRepository } from './addresses.repository';

@Injectable()
export class AddressesService {
  constructor(private readonly addressesRepository: AddressesRepository) {}

  async getAddressesByUserId(userId: string) {
    return await this.addressesRepository.getAddressesByUserId(userId);
  }

  async createAddress(data: {
    UserID: string;
    Phone: string;
    ReceiverName: string;
    Address: string;
    IsDefault: boolean;
  }) {
    if (data.IsDefault) {
      const addresses = await this.addressesRepository.getAddressesByUserId(
        data.UserID,
      );
      addresses.forEach(async (address) => {
        await this.addressesRepository.updateAddress({
          AddressID: address.AddressID,
          Phone: address.Phone,
          ReceiverName: address.ReceiverName,
          Address: address.Address,
          IsDefault: false,
        });
      });
    }

    return await this.addressesRepository.createAddress(data);
  }

  async updateAddress(data: {
    AddressID: string;
    Phone: string;
    ReceiverName: string;
    Address: string;
    IsDefault: boolean;
  }) {
    //if is default address, modify all the address into non default
    const UserID = await this.addressesRepository.getUserIDByAddressID(
      data.AddressID,
    );
    if (data.IsDefault) {
      const addresses =
        await this.addressesRepository.getAddressesByUserId(UserID);
      addresses.forEach(async (address) => {
        await this.addressesRepository.updateAddress({
          AddressID: address.AddressID,
          Phone: address.Phone,
          ReceiverName: address.ReceiverName,
          Address: address.Address,
          IsDefault: false,
        });
      });
    }
    return await this.addressesRepository.updateAddress(data);
  }

  async getAddressByAddressID(addressID: string) {
    return await this.addressesRepository.getAddressByAddressID(addressID);
  }
}
