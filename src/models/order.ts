export interface Order {
  items: {
    game: {
      _id: string;
      name: string;
      price: number;
      images: {
        _key: string;
        url: string;
      }[];
      slug: { current: string };
      description: string;
    };
    quantity: number;
  }[];
  orderStatus: string;
  _id: string;
}
