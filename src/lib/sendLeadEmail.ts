import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

type LeadData = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  pageUrl?: string;
  ipAddress?: string;
  userAgent?: string;
  submittedAt?: string | Date;
};

export async function sendLeadEmail(lead: LeadData) {
  const submittedAt = lead.submittedAt
    ? new Date(lead.submittedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    : "";

  const fields: string[] = [];

  if (lead.name?.trim()) {
    fields.push(`Name: ${lead.name}`);
  }

  if (lead.email?.trim()) {
    fields.push(`Email: ${lead.email}`);
  }

  if (lead.phone?.trim()) {
    fields.push(`Phone: ${lead.phone}`);
  }

  if (lead.message?.trim()) {
    fields.push(`Message: ${lead.message}`);
  }

  if (lead.pageUrl?.trim()) {
    fields.push(`Page URL: ${lead.pageUrl}`);
  }

  if (lead.ipAddress?.trim()) {
    fields.push(`IP Address: ${lead.ipAddress}`);
  }

  if (lead.userAgent?.trim()) {
    fields.push(`Browser: ${lead.userAgent}`);
  }

  if (submittedAt) {
    fields.push(`Submitted At: ${submittedAt}`);
  }

  const recipient = process.env.LEAD_EMAIL;

  const subject = "Enquiry @Ecole Globale";

  try {
    const info = await transporter.sendMail({
      from: `"Ecole Globale Website" <${process.env.GMAIL_USER}>`,
      to: recipient?.split(","),
      replyTo: lead.email,
      subject,

      text: `New Website Enquiry

${fields.join("\n")}

This email was automatically generated from the Ecole Globale website.`,
    });

    console.log("✅ Lead email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Failed to send lead email:", error);
    throw error;
  }
}
