export interface Review {
  ReviewID: string;
  BookID: string;
  UserID: string;
  ReviewTitle: string;
  Rating: number;
  Comment: string;
  CreatedAt: Date;
}
