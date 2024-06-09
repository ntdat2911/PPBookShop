import { gql } from "@/codegen/__generated__";

export const CREATE_ORDER = gql(`
mutation CreateOrder(
  $UserID:String!,
  $TotalPrice:Float!,
  $Status:String!,
  $AddressID:String!,
  $PaymentMethod:String!,
	$OrderItems:String!
){
  createOrder(
  data:{
    UserID:$UserID
    TotalPrice:$TotalPrice
    Status:$Status
    AddressID:$AddressID
    PaymentMethod:$PaymentMethod
    OrderItems:$OrderItems
  }
  )
    {
      OrderID
      UserID
      Status
      TotalPrice
      PaymentMethod
    }
}
`);
