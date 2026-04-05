import { NextResponse } from "next/server";
import { Resend } from "resend";

type Intent = "contact" | "seo-audit";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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

function buildRedirectUrl(
  request: Request,
  redirectTo: string,
  intent: Intent,
  status: "success" | "error",
  fields?: Record<string, string>,
) {
  const url = new URL(redirectTo || "/contact", request.url);

  url.searchParams.set("status", status);
  url.searchParams.set("intent", intent);

  if (fields) {
    for (const [key, value] of Object.entries(fields)) {
      appendIfPresent(url, key, value);
    }
  }

  return url;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const redirectTo = getField(formData, "redirectTo") || "/contact";
  const intent = getField(formData, "intent") === "seo-audit" ? "seo-audit" : "contact";
  const source = getField(formData, "source") || "website";
  const firstName = getField(formData, "firstName");
  const lastName = getField(formData, "lastName");
  const email = getField(formData, "email");
  const company = getField(formData, "company");
  const website = getField(formData, "website");
  const goals = getField(formData, "goals");

  const fields = {
    firstName,
    lastName,
    email,
    company,
    website,
    goals,
  };

  if (!email || (intent === "seo-audit" && !website)) {
    const redirectUrl = buildRedirectUrl(request, redirectTo, intent, "error", fields);
    return NextResponse.redirect(redirectUrl);
  }

  if (!resend) {
    console.error("RESEND_API_KEY is not configured.");
    const redirectUrl = buildRedirectUrl(request, redirectTo, intent, "error", fields);
    return NextResponse.redirect(redirectUrl);
  }

  const senderName =
    [firstName, lastName].filter(Boolean).join(" ") || company || email;
  const requestLabel = intent === "seo-audit" ? "SEO audit request" : "Contact request";
  const subject = `${requestLabel} from ${senderName}`;

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
            <td style="padding: 8px 0; font-weight: 700;">Website</td>
            <td style="padding: 8px 0;">${escapeHtml(website || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Goals</td>
            <td style="padding: 8px 0;">${escapeHtml(goals || "Not provided").replaceAll("\n", "<br />")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        "Adventise Website <leads@adventise.com>",
      to: [process.env.CONTACT_TO_EMAIL || "hello@adventise.com"],
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    const redirectUrl = buildRedirectUrl(request, redirectTo, intent, "success");
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Failed to send contact email.", error);
    const redirectUrl = buildRedirectUrl(request, redirectTo, intent, "error", fields);
    return NextResponse.redirect(redirectUrl);
  }
}
