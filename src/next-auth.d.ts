import type { UserSchema } from "./db/schema";

export type ExtendedUser = UserSchema;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
