import { env } from "@/env";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const db = drizzle({
  connection: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
});

export default db;
