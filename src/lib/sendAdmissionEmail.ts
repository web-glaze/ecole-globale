import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

type AdmissionData = {
  academicYear: string;
  admissionClass: string;

  studentFirstName: string;
  studentMiddleName?: string;
  studentLastName: string;
  studentName?: string;

  dateOfBirth: string | Date;
  email: string;
  aadhaarNumber?: string;
  phone: string;

  fatherSalutation?: string;
  fatherName?: string;

  motherSalutation?: string;
  motherName?: string;

  address: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;

  agree?: boolean;

  pageUrl?: string;
  ipAddress?: string;
  userAgent?: string;
  submittedAt?: string | Date;
};

export async function sendAdmissionEmail(admission: AdmissionData) {
  const submittedAt = admission.submittedAt
    ? new Date(admission.submittedAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    : "";

  const dateOfBirth = admission.dateOfBirth
    ? new Date(admission.dateOfBirth).toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    : "";

  const studentName = admission.studentName || [admission.studentFirstName, admission.studentMiddleName, admission.studentLastName].filter(Boolean).join(" ");

  const fields: string[] = [];

  // Admission Details
  fields.push("========== ADMISSION DETAILS ==========");

  if (admission.academicYear?.trim()) {
    fields.push(`Academic Year: ${admission.academicYear}`);
  }

  if (admission.admissionClass?.trim()) {
    fields.push(`Admission Sought In Class: ${admission.admissionClass}`);
  }

  // Student Details
  fields.push("");
  fields.push("========== STUDENT DETAILS ==========");

  if (studentName?.trim()) {
    fields.push(`Student Name: ${studentName}`);
  }

  if (dateOfBirth) {
    fields.push(`Date of Birth: ${dateOfBirth}`);
  }

  if (admission.email?.trim()) {
    fields.push(`Email: ${admission.email}`);
  }

  if (admission.phone?.trim()) {
    fields.push(`Primary Contact (WhatsApp): ${admission.phone}`);
  }

  if (admission.aadhaarNumber?.trim()) {
    fields.push(`Aadhaar No.: ${admission.aadhaarNumber}`);
  }

  // Parent Details
  fields.push("");
  fields.push("========== PARENT DETAILS ==========");

  if (admission.fatherName?.trim()) {
    const father = [admission.fatherSalutation, admission.fatherName].filter(Boolean).join(" ");

    fields.push(`Father's Name: ${father}`);
  }

  if (admission.motherName?.trim()) {
    const mother = [admission.motherSalutation, admission.motherName].filter(Boolean).join(" ");

    fields.push(`Mother's Name: ${mother}`);
  }

  // Address
  fields.push("");
  fields.push("========== CORRESPONDENCE ADDRESS ==========");

  if (admission.address?.trim()) {
    fields.push(`Address: ${admission.address}`);
  }

  if (admission.city?.trim()) {
    fields.push(`City: ${admission.city}`);
  }

  if (admission.state?.trim()) {
    fields.push(`State: ${admission.state}`);
  }

  if (admission.pinCode?.trim()) {
    fields.push(`Pin Code: ${admission.pinCode}`);
  }

  if (admission.country?.trim()) {
    fields.push(`Country: ${admission.country}`);
  }

  // Declaration
  fields.push("");
  fields.push("========== DECLARATION ==========");

  fields.push(`Terms & Conditions Accepted: ${admission.agree ? "Yes" : "No"}`);

  // Tracking information
  fields.push("");
  fields.push("========== SUBMISSION DETAILS ==========");

  if (admission.pageUrl?.trim()) {
    fields.push(`Page URL: ${admission.pageUrl}`);
  }

  if (admission.ipAddress?.trim()) {
    fields.push(`IP Address: ${admission.ipAddress}`);
  }

  if (admission.userAgent?.trim()) {
    fields.push(`Browser: ${admission.userAgent}`);
  }

  if (submittedAt) {
    fields.push(`Submitted At: ${submittedAt}`);
  }

  try {
    const info = await transporter.sendMail({
      from: `"Ecole Globale Website" <${process.env.GMAIL_USER}>`,

      to: process.env.LEAD_EMAIL?.split(",").map((email) => email.trim()),

      replyTo: admission.email,

      subject: `New Admission Enquiry - ${studentName}`,

      text: `New Admission Enquiry

${fields.join("\n")}

This email was automatically generated from the Ecole Globale website.`,
    });

    return info;
  } catch (error) {
    console.error("Failed to send admission email:", error);
    throw error;
  }
}
