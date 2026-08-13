import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { SiteSettings } from "./globals/SiteSettings";
import { Home } from "./globals/Home";
import { Media } from "./collections/Media";
import { cloudinaryStorage } from "payload-cloudinary";
import { Testimonials } from "./collections/Testimonials";
import { Pages } from "./collections/Pages";
import { Navigation } from "./globals/Navigation";
import { Leads } from "./collections/Leads";
import { Admissions } from "./collections/Admissions";
import { LatestUpdates } from "./collections/LatestUpdates";
import { Users } from "./collections/Users";
import { Vacancies } from "./collections/Vacancies";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Media, Pages, Testimonials, Leads, Admissions, LatestUpdates, Users, Vacancies],
  globals: [SiteSettings, Home, Navigation],

  admin: {
    components: {
      graphics: {
        Logo: "@/components/admin/Logo",
        Icon: "@/components/admin/Icon",
      },
    },
  },

  plugins: [
    cloudinaryStorage({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
      },

      collections: {
        media: true,
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || "",

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
});
