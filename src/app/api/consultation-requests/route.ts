import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";

import { getStrapiUrl } from "@/lib/strapi";

type MailTemplate = {
  subject: string;
  text: string;
  html: string;
};

const LOGO_FALLBACK_URL = "https://www.cocinasjam.com/_next/image?url=%2Flogo.jpeg&w=640&q=75";

function getRequiredString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function buildConfirmationTemplate(fullName: string, hasEmbeddedLogo: boolean): MailTemplate {
  const contactName = fullName.trim() || "Hola";
  const logoBlock = hasEmbeddedLogo
    ? `<img src="cid:cocinasjam-logo" alt="Cocinas JAM" width="170" style="display:block;max-width:170px;height:auto;margin:0 auto 18px auto;" />`
    : `<img src="${LOGO_FALLBACK_URL}" alt="Cocinas JAM" width="170" style="display:block;max-width:170px;height:auto;margin:0 auto 18px auto;" />`;

  return {
    subject: "Hemos recibido tu consulta - Cocinas JAM",
    text: `${contactName}, hemos recibido tu consulta correctamente. Nuestro equipo revisara tu solicitud y te contactara lo antes posible.`,
    html: `
      <div style="margin:0;padding:24px;background:#07080f;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e8e9ee;">
        <div style="max-width:640px;margin:0 auto;border-radius:24px;border:1px solid rgba(255,255,255,0.12);background:linear-gradient(140deg,#0f111a 0%,#0a0c13 45%,#06070b 100%);padding:40px 30px;">
          <div style="text-align:center;">
            ${logoBlock}
          </div>
          <p style="margin:0;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#9fa3b2;">Confirmacion de consulta</p>
          <h1 style="margin:16px 0 0 0;font-size:30px;line-height:1.15;color:#f6f7fb;font-weight:500;">Tu solicitud ya esta en cola.</h1>
          <p style="margin:18px 0 0 0;font-size:16px;line-height:1.75;color:#c9ceda;">${contactName}, hemos recibido tu consulta correctamente. Gracias por compartir los detalles de tu proyecto.</p>
          <div style="margin-top:24px;border:1px solid rgba(201,178,122,0.35);background:rgba(201,178,122,0.08);border-radius:16px;padding:16px 18px;">
            <p style="margin:0;font-size:15px;line-height:1.6;color:#f6e8c3;">Nuestro equipo revisara la solicitud y te contactara lo antes posible.</p>
          </div>
          <p style="margin:24px 0 0 0;font-size:14px;line-height:1.7;color:#aab0bf;">Si necesitas ampliar informacion, puedes responder a este correo.</p>
        </div>
      </div>
    `,
  };
}

async function getLogoAttachment() {
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.jpeg");
    const logoBuffer = await readFile(logoPath);

    return {
      filename: "logo.jpeg",
      content: logoBuffer,
      cid: "cocinasjam-logo",
    };
  } catch {
    return null;
  }
}

async function sendConfirmationEmail({
  to,
  fullName,
}: {
  to: string;
  fullName: string;
}) {
  const host = process.env.SMTP_HOST;
  const portValue = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = user;

  if (!host || !portValue || !user || !pass || !from) {
    return;
  }

  const port = Number(portValue);

  if (!Number.isFinite(port)) {
    return;
  }

  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  const replyTo = user;
  const logoAttachment = await getLogoAttachment();
  const template = buildConfirmationTemplate(fullName, Boolean(logoAttachment));
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo,
    subject: template.subject,
    html: template.html,
    text: template.text,
    attachments: logoAttachment ? [logoAttachment] : undefined,
  });
}

async function uploadAttachments(formData: FormData, token: string | undefined) {
  const files = formData
    .getAll("attachments")
    .filter((file): file is File => file instanceof File && file.size > 0);

  if (files.length === 0) {
    return [];
  }

  const uploadData = new FormData();

  files.forEach((file) => {
    uploadData.append("files", file, file.name);
  });

  const headers = new Headers();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const uploadResponse = await fetch(getStrapiUrl("/api/upload"), {
    method: "POST",
    headers,
    body: uploadData,
    cache: "no-store",
  });

  if (!uploadResponse.ok) {
    throw new Error("No hemos podido subir los archivos adjuntos.");
  }

  const uploadPayload = (await uploadResponse.json()) as Array<{ id: number }>;
  return uploadPayload.map((file) => file.id);
}

export async function POST(request: Request) {
  if (!process.env.STRAPI_URL) {
    return NextResponse.json(
      { error: "El servidor no esta configurado para enviar solicitudes." },
      { status: 500 },
    );
  }

  try {
    const formData = await request.formData();

    const fullName = getRequiredString(formData, "name");
    const phone = getRequiredString(formData, "phone");
    const clientType = getRequiredString(formData, "clientType");
    const serviceType = getRequiredString(formData, "serviceType");
    const projectStatus = getRequiredString(formData, "projectStatus");
    const budget = getRequiredString(formData, "budget");
    const timeline = getRequiredString(formData, "timeline");
    const homeType = getRequiredString(formData, "homeType");
    const privacyAccepted = formData.get("privacyAccepted") === "on";

    if (
      !fullName ||
      !phone ||
      !clientType ||
      !serviceType ||
      !projectStatus ||
      !budget ||
      !timeline ||
      !homeType ||
      !privacyAccepted
    ) {
      return NextResponse.json(
        { error: "Completa todos los campos obligatorios antes de enviar." },
        { status: 400 },
      );
    }

    const strapiToken = process.env.STRAPI_API_TOKEN;
    const attachmentIds = await uploadAttachments(formData, strapiToken);

    const payloadData: Record<string, string | number[]> = {
      full_name: fullName,
      phone,
      client_type: clientType,
      service_type: serviceType,
      current_state: projectStatus,
      budget,
      estimated_date: timeline,
      housing_type: homeType,
    };

    const email = getOptionalString(formData, "email");
    const location = getOptionalString(formData, "location");
    const measures = getOptionalString(formData, "measurements");
    const comments = getOptionalString(formData, "notes");

    if (email) {
      payloadData.mail = email;
    }

    if (location) {
      payloadData.location = location;
    }

    if (measures) {
      payloadData.apporx_measures = measures;
    }

    if (comments) {
      payloadData.comments = comments;
    }

    if (attachmentIds.length > 0) {
      payloadData.house_plans = attachmentIds;
    }

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (strapiToken) {
      headers.set("Authorization", `Bearer ${strapiToken}`);
    }

    const response = await fetch(getStrapiUrl("/api/consultation-requests"), {
      method: "POST",
      headers,
      body: JSON.stringify({ data: payloadData }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "No hemos podido guardar tu solicitud. Intentalo de nuevo." },
        { status: 502 },
      );
    }

    if (email) {
      try {
        await sendConfirmationEmail({
          to: email,
          fullName,
        });
      } catch {
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "No hemos podido enviar tu solicitud. Intentalo de nuevo." },
      { status: 500 },
    );
  }
}
