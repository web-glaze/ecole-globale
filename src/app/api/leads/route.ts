import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = await getPayload({
      config,
    });

    const lead = await payload.create({
      collection: "leads",
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
      },
    });

    return Response.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
