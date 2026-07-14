export const dynamic = "force-dynamic";

import HomeClient from "@/app/(frontend)/HomeClient";
import { getPayload } from "payload";
import config from "@payload-config";

export default async function HomePage() {
  const payload = await getPayload({
    config,
  });

  const home = await payload.findGlobal({
    slug: "home",
    depth: 2,
  });

  return <HomeClient home={home} />;
}
