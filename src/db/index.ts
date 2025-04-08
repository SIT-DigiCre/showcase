import { env } from "@/env";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/libsql";

const db = drizzle({
  connection: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  schema,
});

export default db;
