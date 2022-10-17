export interface Order {
  ingredients: string[];
  _id: string;
  status: "done" | "pending";
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
