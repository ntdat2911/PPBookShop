export interface IBook {
  BookID: string;
  ImageURL: string;
  BookTitle: string;
  BookDescription: string;
  BookPrice: number;
  CategoryID: string;
  AuthorBy: string;
  PublishDate: Date;
  IsBookActive: boolean;
  IsOutOfStock: boolean;
  Rating: number;
  CreatedAt: Date;
  UpdatedAt: Date;
}
