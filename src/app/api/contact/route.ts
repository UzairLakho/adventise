import { NextResponse } from "next/server";
import { Resend } from "resend";

type Intent = "contact" | "seo-audit" | "local-audit";

type Status = "success" | "error";

type EmailConfig = {
  resend: Resend | null;
  to: string;
  from: string;
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

function getEmailConfig(): EmailConfig {
  return {
    resend: process.env.RESEND_API_KEY
      ? new Resend(process.env.RESEND_API_KEY)
      : null,
    to: process.env.CONTACT_TO_EMAIL || "hello@adventise.com",
    from:
      process.env.CONTACT_FROM_EMAIL ||
      "Adventise Website <hello@adventise.com>",
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
  const location = getField(formData, "location");
  const auditType = getField(formData, "auditType");
  const website = getField(formData, "website");
  const goals = getField(formData, "goals");
  const honeypot = getField(formData, "faxNumber");

  const fields = {
    firstName,
    lastName,
    email,
    company,
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

  const senderName =
    [firstName, lastName].filter(Boolean).join(" ") || company || email;
  const requestLabel =
    intent === "contact" ? "Contact request" : "Local SEO and Maps audit request";
  const subject = `${requestLabel} from ${senderName}${location ? ` in ${location}` : ""}`;

  const html = `
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
              [firstName, lastName].filter(Boolean).join(" ") || "Not provided",
            )}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Email</td>
            <td style="padding: 8px 0;">${escapeHtml(email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Company</td>
            <td style="padding: 8px 0;">${escapeHtml(company || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Primary city / service area</td>
            <td style="padding: 8px 0;">${escapeHtml(location || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Audit focus</td>
            <td style="padding: 8px 0;">${escapeHtml(auditType || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Website</td>
            <td style="padding: 8px 0;">${escapeHtml(website || "No website or GBP link shared")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Notes</td>
            <td style="padding: 8px 0;">${escapeHtml(goals || "Not provided").replaceAll("\n", "<br />")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  try {
    const { error } = await emailConfig.resend.emails.send({
      from: emailConfig.from,
      to: [emailConfig.to],
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    const redirectUrl = buildRedirectUrl(request, redirectTo, intent, "success");
    return redirectWithStatus(redirectUrl);
  } catch (error) {
    console.error("Failed to send contact email.", error);
    const message =
      error instanceof Error
        ? error.message
        : "Resend rejected the request. Please confirm your sender domain and deployment environment variables.";
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
