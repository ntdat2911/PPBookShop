import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AddressesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAddressesByUserId(userId: string) {
    return await this.prisma.address.findMany({
      where: {
        UserID: userId,
      },
    });
  }

  async createAddress(data: {
    UserID: string;
    Phone: string;
    ReceiverName: string;
    Address: string;
    IsDefault: boolean;
  }) {
    return await this.prisma.address.create({
      data: {
        ...data,
      },
    });
  }

  async updateAddress(data: {
    AddressID: string;
    Phone: string;
    ReceiverName: string;
    Address: string;
    IsDefault: boolean;
  }) {
    return await this.prisma.address.update({
      where: {
        AddressID: data.AddressID,
      },
      data: {
        Phone: data.Phone,
        ReceiverName: data.ReceiverName,
        Address: data.Address,
        IsDefault: data.IsDefault,
      },
    });
  }

  //get User ID by Address ID
  async getUserIDByAddressID(addressID: string) {
    const address = await this.prisma.address.findUnique({
      where: {
        AddressID: addressID,
      },
      select: {
        UserID: true,
      },
    });
    return address.UserID;
  }

  async getAddressByAddressID(addressID: string) {
    return await this.prisma.address.findUnique({
      where: {
        AddressID: addressID,
      },
    });
  }
}
