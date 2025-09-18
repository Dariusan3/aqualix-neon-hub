// Vercel-style serverless function to handle JoinUs form submissions
// Sends notification to your team and an acknowledgement to the user via Mailjet v3.1

export const config = {
  runtime: "edge",
};

interface JoinPayload {
  name: string;
  email: string;
  socialProfile?: string;
  preferredTeam: string;
  motivation: string;
}

function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  const mailjetApiKey = process.env.MAILJET_API_KEY;
  const mailjetApiSecret = process.env.MAILJET_API_SECRET;
  const contactEmail = process.env.CONTACT_EMAIL;
  const senderEmail = process.env.SENDER_EMAIL || "Aqualix <noreply@example.com>"; // Should be a validated sender/domain in Mailjet

  if (!mailjetApiKey || !mailjetApiSecret || !contactEmail) {
    return new Response(
      JSON.stringify({ error: "Server not configured. Missing MAILJET_API_KEY, MAILJET_API_SECRET or CONTACT_EMAIL" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  let body: JoinPayload;
  try {
    body = (await req.json()) as JoinPayload;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const { name, email, socialProfile, preferredTeam, motivation } = body;

  if (!name || name.length < 2) {
    return new Response(JSON.stringify({ error: "Invalid name" }), { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
  }
  if (!preferredTeam) {
    return new Response(JSON.stringify({ error: "Preferred team is required" }), { status: 400 });
  }
  if (!motivation || motivation.length < 50) {
    return new Response(JSON.stringify({ error: "Motivation must be at least 50 characters" }), {
      status: 400,
    });
  }

  const submittedAt = new Date().toISOString();

  const teamEmailHtml = `
    <div>
      <h2>New Aqualix Application</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${socialProfile ? `<p><strong>Social:</strong> ${socialProfile}</p>` : ""}
      <p><strong>Preferred Team:</strong> ${preferredTeam}</p>
      <p><strong>Motivation:</strong></p>
      <pre style="white-space:pre-wrap;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji">${motivation}</pre>
      <p style="color:#6b7280;font-size:12px">Submitted at ${submittedAt}</p>
    </div>`;

  const applicantEmailHtml = `
    <div>
      <h2>Thanks for applying to Aqualix, ${name}!</h2>
      <p>We received your application and will get back to you within 48 hours.</p>
      <p>Team selected: <strong>${preferredTeam}</strong></p>
      <p>— The Aqualix Team</p>
    </div>`;

  function parseSender(sender: string): { name: string; email: string } {
    const match = sender.match(/^(.*)<\s*(.+)\s*>$/);
    if (match) {
      return { name: match[1].trim() || "Aqualix", email: match[2].trim() };
    }
    return { name: "Aqualix", email: sender };
  }

  async function sendEmail(to: string, subject: string, html: string) {
    const from = parseSender(senderEmail);
    const authHeader = "Basic " + btoa(`${mailjetApiKey}:${mailjetApiSecret}`);

    const payload = {
      Messages: [
        {
          From: { Email: from.email, Name: from.name },
          To: [{ Email: to }],
          Subject: subject,
          HTMLPart: html,
        },
      ],
    } as const;

    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Mailjet error: ${response.status} ${err}`);
    }
    return { ok: true };
  }

  try {
    const tasks: Array<Promise<any>> = [];
    // Always notify your team
    tasks.push(
      sendEmail(
        contactEmail!,
        `New Aqualix Application: ${name} (${preferredTeam})`,
        teamEmailHtml
      )
    );

    // Only send applicant acknowledgement when explicitly allowed
    const allowApplicantEmail = (process.env.ALLOW_APPLICANT_EMAIL || "false").toLowerCase() === "true";
    if (allowApplicantEmail) {
      tasks.push(
        sendEmail(
          email,
          `We received your Aqualix application`,
          applicantEmailHtml
        )
      );
    }

    await Promise.all(tasks);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message || "Email send failed" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}


