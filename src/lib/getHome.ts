import { getPayload } from "payload";
import config from "@payload-config";

export async function getHome() {
  const payload = await getPayload({ config });

  return payload.findGlobal({
    slug: "home",
    depth: 2,
  });
}
