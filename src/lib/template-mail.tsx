/**
 * Copyright 2024 Plus Five Five, Inc
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * MagicLinkEmail.tsx
 * Modified from Raycast's example email template
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Button,
} from "@react-email/components";
import * as React from "react";
import type { Product } from "@/types/product/product";

interface MagicLinkEmailProps {
  magicLink?: string;
}

export const SubscriptionEmail = ({ alerts }: { alerts: Product[] }) => (
  <Html>
    <Head />
    <Preview>Here are the products you subscribed to.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text
          style={{
            margin: "0px",
            marginTop: 8,
            fontSize: 20,
            lineHeight: "28px",
            fontWeight: 600,
            color: "rgb(17,24,39)",
          }}
        >
          BibiPrice - 图书比价
        </Text>
        <Heading style={heading}>📬 你订阅的商品降价啦！</Heading>
        <Section style={body}>
          {alerts.map((product) => (
            <Row key={product.identifier}>
              <Section style={{ marginTop: 16, marginBottom: 16 }}>
                <table style={{ width: "100%" }}>
                  <tbody style={{ width: "100%" }}>
                    <tr style={{ width: "100%" }}>
                      <td
                        style={{
                          width: "50%",
                          paddingRight: 32,
                          boxSizing: "border-box",
                        }}
                      >
                        <Img
                          alt="Braun Vintage"
                          height={220}
                          src={product.image}
                          style={{
                            borderRadius: 8,
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td style={{ width: "50%", verticalAlign: "baseline" }}>
                        <Text
                          style={{
                            margin: "0px",
                            marginTop: 8,
                            fontSize: 18,
                            lineHeight: "28px",
                            fontWeight: 600,
                            color: "rgb(17,24,39)",
                          }}
                        >
                          {product.name.slice(0, 20)}...
                        </Text>
                        <Text
                          style={{
                            marginTop: 8,
                            fontSize: 14,
                            lineHeight: "24px",
                            color: "rgb(107,114,128)",
                          }}
                        >
                          {product.description?.slice(0, 50)}...
                        </Text>
                        <Text
                          style={{
                            marginTop: 8,
                            fontSize: 18,
                            lineHeight: "28px",
                            fontWeight: 600,
                            color: "rgb(17,24,39)",
                          }}
                        >
                          {"¥ " + product.price}
                        </Text>
                        <Button
                          href={product.url}
                          style={{
                            width: "75%",
                            borderRadius: 8,
                            backgroundColor: "rgb(79,70,229)",
                            paddingTop: 12,
                            paddingBottom: 12,
                            paddingLeft: 16,
                            paddingRight: 16,
                            textAlign: "center",
                            fontWeight: 600,
                            color: "rgb(255,255,255)",
                          }}
                        >
                          查看详情
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Section>
            </Row>
          ))}
          <Text style={paragraph}>
            Best,
            <br />- BibiPrice
          </Text>
          <Hr style={hr} />
          <Text style={footer}>BibiPrice@uqbarz</Text>
          <Text style={footer}>2024 Zhejiang University B/S Project</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const MagicLinkEmail = ({ magicLink }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Log in with this magic link.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text
          style={{
            margin: "0px",
            marginTop: 8,
            fontSize: 20,
            lineHeight: "28px",
            fontWeight: 600,
            color: "rgb(17,24,39)",
          }}
        >
          BibiPrice - 图书比价
        </Text>
        <Heading style={heading}>🪄 你的 MagicLink！</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={magicLink}>
              👉 点 此 登 录 👈
            </Link>
          </Text>
          <Text style={paragraph}>如果你并没有请求此链接，请忽略此邮件。</Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- BibiPrice
        </Text>
        <Hr style={hr} />
        <Text style={footer}>BibiPrice@uqbarz</Text>
        <Text style={footer}>2024 Zhejiang University B/S Project</Text>
      </Container>
    </Body>
  </Html>
);

MagicLinkEmail.PreviewProps = {
  magicLink: "https://bibiprice.com",
} as MagicLinkEmailProps;

export default MagicLinkEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
