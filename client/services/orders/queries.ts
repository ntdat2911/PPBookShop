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

export const GET_ORDERS_BY_USER_ID = gql(`
query GetOrdersByUserID($userID:String!){
  getOrdersByUserID(userID:$userID){
    OrderID
    UserID
    Status
    TotalPrice
    PaymentMethod
    OrderItems{
      BookID
      ItemQuantity
      UnitItemPrice
      Discount
      TotalItemPrice
      ImageURL
      BookTitle
    }
  },
}
`);
