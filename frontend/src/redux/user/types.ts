export type UserType = {
  email: string;
  role: "admin" | "user";
  name: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  IDLE = "idle",
}

export interface IUserSliceState {
  user: UserType | null;
  status: Status;
}
