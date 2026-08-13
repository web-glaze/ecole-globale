import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

type VacancyData = {
  name: string;
  email: string;
  phone?: string;
  postAppliedFor?: string;
  subject?: string;
  pageUrl?: string;
  ipAddress?: string;
  userAgent?: string;
  submittedAt?: string | Date;
};

export async function sendVacancyEmail(vacancy: VacancyData) {
  const submittedAt = vacancy.submittedAt
    ? new Date(vacancy.submittedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    : "";

  const fields: string[] = [];

  if (vacancy.name?.trim()) {
    fields.push(`Name: ${vacancy.name}`);
  }

  if (vacancy.email?.trim()) {
    fields.push(`Email: ${vacancy.email}`);
  }

  if (vacancy.phone?.trim()) {
    fields.push(`Phone: ${vacancy.phone}`);
  }

  if (vacancy.postAppliedFor?.trim()) {
    fields.push(`Post Applied For: ${vacancy.postAppliedFor}`);
  }

  if (vacancy.subject?.trim()) {
    fields.push(`Subject: ${vacancy.subject}`);
  }

  if (vacancy.pageUrl?.trim()) {
    fields.push(`Page URL: ${vacancy.pageUrl}`);
  }

  if (vacancy.ipAddress?.trim()) {
    fields.push(`IP Address: ${vacancy.ipAddress}`);
  }

  if (vacancy.userAgent?.trim()) {
    fields.push(`Browser: ${vacancy.userAgent}`);
  }

  if (submittedAt) {
    fields.push(`Submitted At: ${submittedAt}`);
  }

  const recipient = process.env.VACANCY_EMAIL;

  const subject = `Job Application @Ecole Globale`;

  try {
    const info = await transporter.sendMail({
      from: `"Ecole Globale Website" <${process.env.GMAIL_USER}>`,
      to: recipient?.split(","),
      replyTo: vacancy.email,
      subject,

      text: `New Job Application

${fields.join("\n")}

This email was automatically generated from the Ecole Globale website.`,
    });

    console.log("✅ Vacancy application email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Failed to send vacancy email:", error);

    throw error;
  }
}
