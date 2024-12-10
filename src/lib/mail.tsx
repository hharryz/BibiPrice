import { EmailConfig } from "next-auth/providers";
import { render } from "@react-email/render";
import { MagicLinkEmail, SubscriptionEmail } from "./templateMail";
import type { Product } from "@/types/product/product";

export async function sendAuthRequest(params: {
  identifier: string;
  url: string;
  provider: EmailConfig;
}) {
  const { identifier: to, url, provider } = params;

  const html = await render(<MagicLinkEmail magicLink={url} />, {
    pretty: true,
  });

  const text = await render(<MagicLinkEmail magicLink={url} />, {
    plainText: true,
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `BibiPrice 登录验证`,
      html: html,
      text: text,
    }),
  });

  if (!res.ok)
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
}

export async function sendSubscription({
  to,
  alerts,
}: {
  to: string;
  alerts: Product[];
}) {
  const html = await render(<SubscriptionEmail alerts={alerts} />, {
    pretty: true,
  });

  const text = await render(<SubscriptionEmail alerts={alerts} />, {
    plainText: true,
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "bibiprice@uqbarz.com",
      to,
      subject: `BibiPrice 降价提醒`,
      html: html,
      text: text,
    }),
  });

  if (!res.ok)
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
}
