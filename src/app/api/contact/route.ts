import { NextResponse } from "next/server";
import { Resend } from "resend";

type Intent = "contact" | "seo-audit" | "local-audit";

type Status = "success" | "error";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  trade: string;
  location: string;
  auditType: string;
  website: string;
  goals: string;
};

type EmailConfig = {
  resend: Resend | null;
  to: string[];
  from: string;
  replyTo: string[];
};

function getField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function appendIfPresent(url: URL, key: string, value: string) {
  if (value) {
    url.searchParams.set(key, value);
  }
}

function sanitizeErrorMessage(value: string) {
  return value
    .replaceAll(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

function parseEmailList(value: string | undefined, fallback: string[]) {
  const emails = (value || "")
    .split(/[,\n;]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  return emails.length ? emails : fallback;
}

function getIntentLabel(intent: Intent) {
  if (intent === "contact") {
    return "Contact request";
  }

  if (intent === "seo-audit") {
    return "SEO audit request";
  }

  return "Local SEO and Maps audit request";
}

function getAuditTypeLabel(auditType: string) {
  switch (auditType) {
    case "google-maps-gbp":
      return "Google Maps / Google Business Profile";
    case "local-seo-website":
      return "Website SEO and local landing pages";
    case "both":
      return "Both SEO and Maps";
    case "not-sure":
      return "Not sure yet";
    default:
      return auditType || "Not provided";
  }
}

function getSenderName(fields: Pick<FormFields, "firstName" | "lastName" | "company" | "email">) {
  return [fields.firstName, fields.lastName].filter(Boolean).join(" ") || fields.company || fields.email;
}

function formatNotesForHtml(value: string) {
  return escapeHtml(value || "Not provided").replaceAll("\n", "<br />");
}

function buildNotificationSubject(intent: Intent, senderName: string, location: string) {
  const requestLabel = getIntentLabel(intent);
  return `${requestLabel} from ${senderName}${location ? ` in ${location}` : ""}`;
}

function buildNotificationHtml(
  intent: Intent,
  source: string,
  subject: string,
  fields: FormFields,
) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0b1f2a;">
      <h1 style="font-size: 20px; margin-bottom: 16px;">${escapeHtml(subject)}</h1>
      <p style="margin: 0 0 16px;">A new form submission came in from the Adventise website.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Intent</td>
            <td style="padding: 8px 0;">${escapeHtml(intent)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Source</td>
            <td style="padding: 8px 0;">${escapeHtml(source)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Name</td>
            <td style="padding: 8px 0;">${escapeHtml(
              [fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Not provided",
            )}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Email</td>
            <td style="padding: 8px 0;">${escapeHtml(fields.email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Company</td>
            <td style="padding: 8px 0;">${escapeHtml(fields.company || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Trade</td>
            <td style="padding: 8px 0;">${escapeHtml(fields.trade || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Primary city / service area</td>
            <td style="padding: 8px 0;">${escapeHtml(fields.location || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Audit focus</td>
            <td style="padding: 8px 0;">${escapeHtml(getAuditTypeLabel(fields.auditType))}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Website</td>
            <td style="padding: 8px 0;">${escapeHtml(fields.website || "No website or GBP link shared")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Notes</td>
            <td style="padding: 8px 0;">${formatNotesForHtml(fields.goals)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function buildNotificationText(intent: Intent, source: string, subject: string, fields: FormFields) {
  return [
    subject,
    "",
    "A new form submission came in from the Adventise website.",
    "",
    `Intent: ${intent}`,
    `Source: ${source}`,
    `Name: ${[fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Not provided"}`,
    `Email: ${fields.email}`,
    `Company: ${fields.company || "Not provided"}`,
    `Trade: ${fields.trade || "Not provided"}`,
    `Primary city / service area: ${fields.location || "Not provided"}`,
    `Audit focus: ${getAuditTypeLabel(fields.auditType)}`,
    `Website: ${fields.website || "No website or GBP link shared"}`,
    "",
    "Notes:",
    fields.goals || "Not provided",
  ].join("\n");
}

function buildConfirmationSubject(intent: Intent) {
    if (intent === "contact") {
    return "We received your message - quick reply requested";
  }

  if (intent === "seo-audit") {
    return "Your Adventise SEO audit request is in - quick reply requested";
  }

  return "Your Adventise local audit request is in - quick reply requested";
}

function buildReplyRequest(intent: Intent, fields: FormFields) {
  if (intent === "contact") {
    return "Please reply with \"confirmed\" so we know this reached the right inbox.";
  }

  const serviceHint = fields.trade || "main service";
  const locationHint = fields.location || "main city";

  return `Please reply with "confirmed" plus your ${serviceHint} and ${locationHint} so we can prioritize the right market review.`;
}

function buildConfirmationHtml(intent: Intent, fields: FormFields) {
  const intro =
    intent === "contact"
      ? "Thanks for reaching out to Adventise. Your message is in and we will follow up soon."
      : "Thanks for requesting an audit from Adventise. We have your details and will review your setup shortly.";

  const nextStep =
    intent === "contact"
      ? "We will review what you shared and reply with the clearest next step for your business."
      : "We will take a look at your market, service area, website, and Google presence, then follow up with the clearest next step.";

  const greeting = fields.firstName || fields.company || "there";
  const replyRequest = buildReplyRequest(intent, fields);

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0b1f2a;">
      <p style="margin: 0 0 16px;">Hi ${escapeHtml(greeting)},</p>
      <p style="margin: 0 0 16px;">${escapeHtml(intro)}</p>
      <p style="margin: 0 0 16px;">${escapeHtml(nextStep)}</p>
      <div style="margin: 0 0 16px; border: 1px solid #f08a62; border-radius: 16px; padding: 16px 18px; background: #fff4eb;">
        <p style="margin: 0 0 8px; font-weight: 700;">Quick confirmation</p>
        <p style="margin: 0;">${escapeHtml(replyRequest)}</p>
      </div>
      <div style="margin: 24px 0; border: 1px solid #d8e0e6; border-radius: 16px; padding: 20px; background: #fbf7ef;">
        <p style="margin: 0 0 12px; font-weight: 700;">What we received</p>
        <p style="margin: 0 0 8px;"><strong>Business:</strong> ${escapeHtml(fields.company || "Not provided")}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
        <p style="margin: 0 0 8px;"><strong>Primary city / service area:</strong> ${escapeHtml(fields.location || "Not provided")}</p>
        <p style="margin: 0 0 8px;"><strong>Audit focus:</strong> ${escapeHtml(getAuditTypeLabel(fields.auditType))}</p>
        <p style="margin: 0 0 8px;"><strong>Website:</strong> ${escapeHtml(fields.website || "No website or GBP link shared")}</p>
        <p style="margin: 0;"><strong>Notes:</strong> ${formatNotesForHtml(fields.goals)}</p>
      </div>
      <p style="margin: 0 0 16px;">If you need to add anything before we reply, just answer this email.</p>
      <p style="margin: 0;">Adventise</p>
    </div>
  `;
}

function buildConfirmationText(intent: Intent, fields: FormFields) {
  const intro =
    intent === "contact"
      ? "Thanks for reaching out to Adventise. Your message is in and we will follow up soon."
      : "Thanks for requesting an audit from Adventise. We have your details and will review your setup shortly.";

  const nextStep =
    intent === "contact"
      ? "We will review what you shared and reply with the clearest next step for your business."
      : "We will take a look at your market, service area, website, and Google presence, then follow up with the clearest next step.";
  const replyRequest = buildReplyRequest(intent, fields);

  return [
    `Hi ${fields.firstName || fields.company || "there"},`,
    "",
    intro,
    nextStep,
    "",
    "Quick confirmation",
    replyRequest,
    "",
    "What we received",
    `Business: ${fields.company || "Not provided"}`,
    `Email: ${fields.email}`,
    `Primary city / service area: ${fields.location || "Not provided"}`,
    `Audit focus: ${getAuditTypeLabel(fields.auditType)}`,
    `Website: ${fields.website || "No website or GBP link shared"}`,
    "Notes:",
    fields.goals || "Not provided",
    "",
    "If you need to add anything before we reply, just answer this email.",
    "",
    "Adventise",
  ].join("\n");
}

function getEmailConfig(): EmailConfig {
  const fallbackTo = ["hello@adventise.com"];
  const to = parseEmailList(process.env.CONTACT_TO_EMAIL, fallbackTo);
  const replyTo = parseEmailList(process.env.CONTACT_REPLY_TO_EMAIL, to);

  return {
    resend: process.env.RESEND_API_KEY
      ? new Resend(process.env.RESEND_API_KEY)
      : null,
    to,
    from:
      process.env.CONTACT_FROM_EMAIL ||
      "Adventise Website <hello@adventise.com>",
    replyTo,
  };
}

function buildRedirectUrl(
  request: Request,
  redirectTo: string,
  intent: Intent,
  status: Status,
  fields?: Record<string, string>,
  errorMessage?: string,
) {
  const url = new URL(redirectTo || "/contact", request.url);

  url.searchParams.set("status", status);
  url.searchParams.set("intent", intent);

  if (fields) {
    for (const [key, value] of Object.entries(fields)) {
      appendIfPresent(url, key, value);
    }
  }

  if (errorMessage) {
    url.searchParams.set("errorMessage", sanitizeErrorMessage(errorMessage));
  }

  return url;
}

function redirectWithStatus(url: URL) {
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const redirectTo = getField(formData, "redirectTo") || "/contact";
  const successRedirectTo = getField(formData, "successRedirectTo") || redirectTo;
  const intentField = getField(formData, "intent");
  const intent =
    intentField === "seo-audit" || intentField === "local-audit"
      ? intentField
      : "contact";
  const source = getField(formData, "source") || "website";
  const firstName = getField(formData, "firstName");
  const lastName = getField(formData, "lastName");
  const email = getField(formData, "email");
  const company = getField(formData, "company");
  const trade = getField(formData, "trade");
  const location = getField(formData, "location");
  const auditType = getField(formData, "auditType");
  const website = getField(formData, "website");
  const goals = getField(formData, "goals");
  const honeypot = getField(formData, "faxNumber");

  const fields: FormFields = {
    firstName,
    lastName,
    email,
    company,
    trade,
    location,
    auditType,
    website,
    goals,
  };

  if (honeypot) {
    const redirectUrl = buildRedirectUrl(request, redirectTo, intent, "success");
    return redirectWithStatus(redirectUrl);
  }

  const isAuditRequest = intent === "seo-audit" || intent === "local-audit";

  if (!email || !company || !goals || (isAuditRequest && (!location || !auditType))) {
    const redirectUrl = buildRedirectUrl(
      request,
      redirectTo,
      intent,
      "error",
      fields,
      "Please complete the required fields and try again.",
    );
    return redirectWithStatus(redirectUrl);
  }

  const emailConfig = getEmailConfig();

  if (!emailConfig.resend) {
    console.error("RESEND_API_KEY is not configured.");
    const redirectUrl = buildRedirectUrl(
      request,
      redirectTo,
      intent,
      "error",
      fields,
      "Email sending is not configured on this deployment. Add RESEND_API_KEY in your hosting environment and redeploy.",
    );
    return redirectWithStatus(redirectUrl);
  }

  const senderName = getSenderName(fields);
  const subject = buildNotificationSubject(intent, senderName, location);
  const confirmationSubject = buildConfirmationSubject(intent);

  try {
    const { error } = await emailConfig.resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      replyTo: email,
      subject,
      html: buildNotificationHtml(intent, source, subject, fields),
      text: buildNotificationText(intent, source, subject, fields),
    });

    if (error) {
      throw new Error(error.message);
    }

    const { error: confirmationError } = await emailConfig.resend.emails.send({
      from: emailConfig.from,
      to: [email],
      replyTo: emailConfig.replyTo,
      subject: confirmationSubject,
      html: buildConfirmationHtml(intent, fields),
      text: buildConfirmationText(intent, fields),
      headers: {
        "X-Entity-Ref-ID": `${intent}:${email}:${company || senderName}`,
      },
      tags: [
        {
          name: "type",
          value: "form-confirmation",
        },
        {
          name: "intent",
          value: intent,
        },
      ],
    });

    if (confirmationError) {
      console.error("Failed to send submitter confirmation email.", confirmationError);
    }

    const redirectUrl = buildRedirectUrl(request, successRedirectTo, intent, "success");
    return redirectWithStatus(redirectUrl);
  } catch (error) {
    console.error("Failed to send contact email.", error);
    const message =
      error instanceof Error
        ? error.message
        : "Resend rejected the request. Please confirm your sender domain, reply-to address, and deployment environment variables.";
    const redirectUrl = buildRedirectUrl(
      request,
      redirectTo,
      intent,
      "error",
      fields,
      message,
    );
    return redirectWithStatus(redirectUrl);
  }
}
