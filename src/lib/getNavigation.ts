import { getPayload } from "payload";
import config from "@payload-config";

export async function getNavigation() {
  const payload = await getPayload({ config });

  return payload.findGlobal({
    slug: "navigation",
    depth: 2,
  });
}
