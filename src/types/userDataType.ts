export type TUserData = {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
};
