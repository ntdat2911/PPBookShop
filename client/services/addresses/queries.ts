import { gql } from "@/codegen/__generated__";

export const GET_ADDRESSES_BY_USER_ID = gql(`
query getAddress($UserID:String!){
  getAddressesByUserId(userId:$UserID){
    Address
    Phone
    ReceiverName
    IsDefault
    AddressID
    UserID
  }
}
`);

export const CREATE_ADDRESS = gql(`
mutation createAddress($UserID:String!,$Phone:String!,$ReceiverName:String!,$Address:String!,$IsDefault:Boolean!){
  createAddress(userId:$UserID,phone:$Phone,receiverName:$ReceiverName,address:$Address,isDefault:$IsDefault){
    Address
    AddressID
    UserID
    ReceiverName
    Phone
    IsDefault
  }
}
`);

export const UPDATE_ADDRESS = gql(`
mutation updateAddress($AddressID:String!,$Phone:String!,$ReceiverName:String!,$Address:String!,$IsDefault:Boolean!){
  updateAddress(addressId:$AddressID,phone:$Phone,receiverName:$ReceiverName,address:$Address,isDefault:$IsDefault){
    Address
    AddressID
    UserID
    ReceiverName
    Phone
    IsDefault
  }
}
`);
