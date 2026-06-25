import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { SiteSettings } from "./globals/SiteSettings";
import { Media } from "./collections/Media";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Media],
  globals: [SiteSettings],

  secret: process.env.PAYLOAD_SECRET || "",

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp: sharp as any,
});
