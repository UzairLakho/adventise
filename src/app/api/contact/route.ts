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

type EmailDetail = {
  label: string;
  valueHtml: string;
};

type EmailShellOptions = {
  previewText: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  badge?: string;
  bodyHtml: string;
  footerText?: string;
};

const emailTheme = {
  ink: "#0b1f2a",
  ink2: "#142b3a",
  ivory: "#f8f5f0",
  sand: "#f2e8dc",
  ember: "#ff6b35",
  emberDark: "#e45521",
  mint: "#5ee6c0",
  slate: "#5d6b74",
  line: "#d9cbb9",
  white: "#ffffff",
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

function buildMailtoHref(to: string, subject: string, body?: string) {
  const params = new URLSearchParams();

  if (subject) {
    params.set("subject", subject);
  }

  if (body) {
    params.set("body", body);
  }

  const query = params.toString();
  return `mailto:${to}${query ? `?${query}` : ""}`;
}

function buildPill(text: string, tone: "ember" | "mint" | "ink" = "ink") {
  const styles =
    tone === "ember"
      ? {
          background: "#fff1ea",
          color: emailTheme.emberDark,
          border: "#ffd4c4",
        }
      : tone === "mint"
        ? {
            background: "#e9fff8",
            color: "#13886c",
            border: "#c0f4e6",
          }
        : {
            background: "#eef3f5",
            color: emailTheme.ink,
            border: "#d7e2e7",
          };

  return `<span style="display:inline-block; margin:0 8px 8px 0; padding:8px 12px; border:1px solid ${styles.border}; border-radius:999px; background:${styles.background}; color:${styles.color}; font-size:12px; font-weight:700; line-height:1.2;">${escapeHtml(text)}</span>`;
}

function buildButton(label: string, href: string, tone: "primary" | "secondary" = "primary") {
  const styles =
    tone === "primary"
      ? {
          background: emailTheme.ember,
          color: emailTheme.white,
          border: emailTheme.ember,
        }
      : {
          background: emailTheme.white,
          color: emailTheme.ink,
          border: emailTheme.line,
        };

  return `<a href="${escapeHtml(href)}" style="display:inline-block; padding:14px 20px; border-radius:999px; border:1px solid ${styles.border}; background:${styles.background}; color:${styles.color}; font-size:14px; font-weight:700; line-height:1.2; text-decoration:none;">${escapeHtml(label)}</a>`;
}

function buildDetailCards(details: EmailDetail[]) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0 12px;">
      ${details
        .map(
          (detail) => `
            <tr>
              <td style="padding:0;">
                <div style="border:1px solid ${emailTheme.line}; border-radius:20px; background:${emailTheme.white}; padding:16px 18px;">
                  <p style="margin:0 0 6px; color:${emailTheme.slate}; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">${escapeHtml(detail.label)}</p>
                  <div style="margin:0; color:${emailTheme.ink}; font-size:15px; line-height:1.6;">${detail.valueHtml}</div>
                </div>
              </td>
            </tr>`,
        )
        .join("")}
    </table>
  `;
}

function buildSteps(
  steps: Array<{
    title: string;
    text: string;
  }>,
) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${steps
        .map(
          (step, index) => `
            <tr>
              <td valign="top" style="padding:0 14px 14px 0; width:40px;">
                <div style="width:32px; height:32px; border-radius:999px; background:${emailTheme.ink}; color:${emailTheme.white}; text-align:center; font-size:14px; font-weight:700; line-height:32px;">
                  ${index + 1}
                </div>
              </td>
              <td style="padding:0 0 14px;">
                <p style="margin:0 0 4px; color:${emailTheme.ink}; font-size:15px; font-weight:700;">${escapeHtml(step.title)}</p>
                <p style="margin:0; color:${emailTheme.slate}; font-size:14px; line-height:1.7;">${escapeHtml(step.text)}</p>
              </td>
            </tr>`,
        )
        .join("")}
    </table>
  `;
}

function buildEmailShell({
  previewText,
  eyebrow,
  title,
  subtitle,
  badge,
  bodyHtml,
  footerText,
}: EmailShellOptions) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <body style="margin:0; padding:0; background:${emailTheme.ivory}; font-family:Arial, sans-serif; color:${emailTheme.ink};">
        <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
          ${escapeHtml(previewText)}
        </div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${emailTheme.ivory};">
          <tr>
            <td align="center" style="padding:24px 12px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;">
                <tr>
                  <td style="padding:0 0 18px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:30px; overflow:hidden; background:${emailTheme.ink}; background-image:linear-gradient(135deg, ${emailTheme.ink} 0%, ${emailTheme.ink2} 58%, ${emailTheme.ember} 100%);">
                      <tr>
                        <td style="padding:30px 28px 32px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td valign="top" style="padding:0 12px 12px 0;">
                                <span style="display:inline-block; padding:8px 12px; border-radius:999px; background:rgba(255,255,255,0.12); color:${emailTheme.white}; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase;">
                                  ${escapeHtml(eyebrow)}
                                </span>
                              </td>
                              ${
                                badge
                                  ? `<td align="right" valign="top" style="padding:0 0 12px;">
                                <span style="display:inline-block; padding:8px 12px; border-radius:999px; background:rgba(94,230,192,0.18); color:${emailTheme.white}; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">
                                  ${escapeHtml(badge)}
                                </span>
                              </td>`
                                  : ""
                              }
                            </tr>
                          </table>
                          <p style="margin:0 0 12px; color:rgba(255,255,255,0.78); font-size:13px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;">
                            Adventise
                          </p>
                          <h1 style="margin:0 0 12px; color:${emailTheme.white}; font-size:34px; line-height:1.15; font-weight:700;">
                            ${escapeHtml(title)}
                          </h1>
                          <p style="margin:0; color:rgba(255,255,255,0.82); font-size:16px; line-height:1.7;">
                            ${escapeHtml(subtitle)}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${emailTheme.line}; border-radius:30px; overflow:hidden; background:${emailTheme.white};">
                      <tr>
                        <td style="padding:28px 24px 30px;">
                          ${bodyHtml}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 10px 0; text-align:center; color:${emailTheme.slate}; font-size:12px; line-height:1.7;">
                    ${escapeHtml(
                      footerText ||
                        "Adventise helps local businesses turn Google visibility into more calls, quote requests, and booked jobs.",
                    )}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
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
  const senderName =
    [fields.firstName, fields.lastName].filter(Boolean).join(" ") || fields.company || fields.email;
  const replyHref = buildMailtoHref(
    fields.email,
    `Re: ${subject}`,
    `Hi ${senderName},\n\nThanks for reaching out to Adventise.\n\n`,
  );

  const bodyHtml = `
    <p style="margin:0 0 18px; color:${emailTheme.slate}; font-size:15px; line-height:1.7;">
      A new website submission just came in and looks ready for a follow-up.
    </p>
    <div style="margin:0 0 18px; padding:20px; border:1px solid ${emailTheme.line}; border-radius:24px; background:${emailTheme.sand};">
      <p style="margin:0 0 8px; color:${emailTheme.slate}; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">
        Lead snapshot
      </p>
      <h2 style="margin:0 0 8px; color:${emailTheme.ink}; font-size:28px; line-height:1.2;">
        ${escapeHtml(fields.company || senderName)}
      </h2>
      <p style="margin:0 0 14px; color:${emailTheme.ink}; font-size:15px; line-height:1.7;">
        ${escapeHtml(fields.email)}
      </p>
      <div style="margin:0;">
        ${buildPill(getIntentLabel(intent), "ember")}
        ${buildPill(source, "ink")}
        ${buildPill(getAuditTypeLabel(fields.auditType), "mint")}
      </div>
    </div>
    <div style="margin:0 0 24px;">
      ${buildButton(`Reply to ${fields.email}`, replyHref)}
    </div>
    <p style="margin:0 0 12px; color:${emailTheme.ink}; font-size:16px; font-weight:700;">
      Lead details
    </p>
    ${buildDetailCards([
      {
        label: "Name",
        valueHtml: escapeHtml(
          [fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Not provided",
        ),
      },
      {
        label: "Primary city / service area",
        valueHtml: escapeHtml(fields.location || "Not provided"),
      },
      {
        label: "Trade",
        valueHtml: escapeHtml(fields.trade || "Not provided"),
      },
      {
        label: "Website",
        valueHtml: escapeHtml(fields.website || "No website or GBP link shared"),
      },
      {
        label: "Notes",
        valueHtml: formatNotesForHtml(fields.goals),
      },
    ])}
  `;

  return buildEmailShell({
    previewText: `${fields.company || senderName} submitted a new request from ${fields.location || "their market"}.`,
    eyebrow: "New Lead",
    title: subject,
    subtitle: "A fresh Adventise form submission is ready for review and reply.",
    badge: "Website Form",
    bodyHtml,
  });
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

function buildConfirmationHtml(intent: Intent, fields: FormFields, replyAddress: string) {
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
  const replyHref = buildMailtoHref(
    replyAddress,
    `Confirmed - ${fields.company || greeting}`,
    [
      "confirmed",
      "",
      `Business: ${fields.company || "Not provided"}`,
      `Primary city / service area: ${fields.location || "Not provided"}`,
      `Main service: ${fields.trade || "Not provided"}`,
      `Top priority: ${fields.goals || "Not provided"}`,
    ].join("\n"),
  );

  const steps =
    intent === "contact"
      ? [
          {
            title: "We review what you sent",
            text: "We look for the clearest next step based on your service, market, and growth goal.",
          },
          {
            title: "We shape the right follow-up",
            text: "If there is a quick win, we will point to it directly instead of sending a vague canned reply.",
          },
          {
            title: "We reply with a concrete next move",
            text: "Expect a practical response you can actually use.",
          },
        ]
      : [
          {
            title: "We review your market",
            text: "We check your service area, local search position, and where competitors are taking visibility.",
          },
          {
            title: "We identify the fastest wins",
            text: "We look for the clearest SEO, Maps, and conversion opportunities first.",
          },
          {
            title: "We follow up with a priority plan",
            text: "You will get the next move that makes the most sense for your business right now.",
          },
        ];

  const bodyHtml = `
    <p style="margin:0 0 12px; color:${emailTheme.ink}; font-size:16px; line-height:1.8;">
      Hi ${escapeHtml(greeting)},
    </p>
    <p style="margin:0 0 12px; color:${emailTheme.slate}; font-size:15px; line-height:1.8;">
      ${escapeHtml(intro)}
    </p>
    <p style="margin:0 0 20px; color:${emailTheme.slate}; font-size:15px; line-height:1.8;">
      ${escapeHtml(nextStep)}
    </p>
    <div style="margin:0 0 20px; padding:22px 20px; border:1px solid #ffd4c4; border-radius:24px; background:#fff4eb;">
      <p style="margin:0 0 8px; color:${emailTheme.emberDark}; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">
        Quick confirmation
      </p>
      <p style="margin:0 0 14px; color:${emailTheme.ink}; font-size:15px; line-height:1.8;">
        ${escapeHtml(replyRequest)}
      </p>
      <div style="margin:0 0 10px;">
        ${buildButton("Reply and confirm", replyHref)}
      </div>
      <p style="margin:0; color:${emailTheme.slate}; font-size:13px; line-height:1.7;">
        If the button does not open your mail app, simply hit reply to this email.
      </p>
    </div>
    <div style="margin:0 0 10px;">
      ${buildPill(getAuditTypeLabel(fields.auditType), "ember")}
      ${buildPill(fields.location || "Location pending", "mint")}
      ${buildPill(fields.website ? "Website shared" : "No website shared", "ink")}
    </div>
    <div style="margin:0 0 22px; padding:22px 20px; border:1px solid ${emailTheme.line}; border-radius:24px; background:${emailTheme.ivory};">
      <p style="margin:0 0 14px; color:${emailTheme.ink}; font-size:16px; font-weight:700;">
        What happens next
      </p>
      ${buildSteps(steps)}
    </div>
    <p style="margin:0 0 12px; color:${emailTheme.ink}; font-size:16px; font-weight:700;">
      What we received
    </p>
    ${buildDetailCards([
      {
        label: "Business",
        valueHtml: escapeHtml(fields.company || "Not provided"),
      },
      {
        label: "Email",
        valueHtml: escapeHtml(fields.email),
      },
      {
        label: "Primary city / service area",
        valueHtml: escapeHtml(fields.location || "Not provided"),
      },
      {
        label: "Audit focus",
        valueHtml: escapeHtml(getAuditTypeLabel(fields.auditType)),
      },
      {
        label: "Website",
        valueHtml: escapeHtml(fields.website || "No website or GBP link shared"),
      },
      {
        label: "Notes",
        valueHtml: formatNotesForHtml(fields.goals),
      },
    ])}
    <p style="margin:18px 0 0; color:${emailTheme.slate}; font-size:14px; line-height:1.8;">
      We will use this to tailor the next step so it fits your actual market instead of sending you a generic answer.
    </p>
  `;

  return buildEmailShell({
    previewText: "We received your request. Please reply to confirm so we can tailor the next step.",
    eyebrow: intent === "contact" ? "Message Received" : "Audit Request Received",
    title: intent === "contact" ? "You’re in our inbox" : "Your request is in",
    subtitle:
      intent === "contact"
        ? "We have your message and will follow up with a clear next move."
        : "We have your details and we’re getting your local review lined up.",
    badge: "Reply Requested",
    bodyHtml,
  });
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
      "Adventise <hello@adventise.com>",
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
  const confirmationReplyAddress = emailConfig.replyTo[0] || emailConfig.to[0] || "hello@adventise.com";

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
      html: buildConfirmationHtml(intent, fields, confirmationReplyAddress),
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
