export function normalizeCertificateId(value: string | null | undefined) {
  return (value ?? "").trim().toUpperCase();
}

export function formatIssueDate(issueDate: string) {
  const [year, month, day] = issueDate.split("-").map(Number);
  if (!year || !month || !day) {
    return issueDate;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
