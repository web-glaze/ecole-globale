type LeadData = {
  name: string;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  pageUrl?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  submittedAt?: string | Date | null;
};

export async function createOdooLead(lead: LeadData) {
  const odooUrl = process.env.ODOO_URL;
  const odooApiKey = process.env.ODOO_API_KEY;
  const odooDatabase = process.env.ODOO_DATABASE;

  if (!odooUrl) {
    throw new Error("ODOO_URL is not configured");
  }

  if (!odooApiKey) {
    throw new Error("ODOO_API_KEY is not configured");
  }

  const description = `
  <div>
    <h3>Website Enquiry</h3>
    ${
      lead.message
        ? `
          <p>
            <strong>Message:</strong><br>
            ${lead.message.replace(/\n/g, "<br>")}
          </p>
        `
        : ""
    }
    <hr>
    <p>
      <strong>Page URL:</strong><br>
      ${lead.pageUrl || "N/A"}
    </p>
    <p>
      <strong>IP Address:</strong><br>
      ${lead.ipAddress || "N/A"}
    </p>
    <p>
      <strong>Browser:</strong><br>
      ${lead.userAgent || "N/A"}
    </p>
    <p>
      <strong>Submitted At:</strong><br>
      ${
        lead.submittedAt
          ? new Date(lead.submittedAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "medium",
              timeZone: "Asia/Kolkata",
            })
          : "N/A"
      }
    </p>
  </div>
`;

  const payload = {
    vals_list: [
      {
        name: `Website Enquiry - ${lead.name}`,
        contact_name: lead.name,
        email_from: lead.email || "",
        phone: lead.phone || "",
        description: description,
        type: "lead",
      },
    ],
  };

  const headers: Record<string, string> = {
    Authorization: `bearer ${odooApiKey}`,
    "Content-Type": "application/json",
  };

  if (odooDatabase) {
    headers["X-Odoo-Database"] = odooDatabase;
  }

  const response = await fetch(`${odooUrl.replace(/\/$/, "")}/json/2/crm.lead/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  let result: unknown;

  try {
    result = JSON.parse(responseText);
  } catch {
    result = responseText;
  }

  if (!response.ok) {
    console.error("❌ Odoo API error:", {
      status: response.status,
      result,
    });

    throw new Error(`Odoo API failed with status ${response.status}: ${responseText}`);
  }

  console.log("✅ Odoo lead created:", result);

  return result;
}
