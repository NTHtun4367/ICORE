import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Apple } from "lucide-react";

interface EmailConfirmationTemplateProps {
  userFirstname?: string;
  confirmEmailLink?: string;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

export const EmailConfirmationTemplate = ({
  userFirstname,
  confirmEmailLink,
}: EmailConfirmationTemplateProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Confirm Your Account - Welcome to ICORE</Preview>
        <Container style={container}>
          <Apple size={32} fill="4" />
          <h1 className="text-3xl font-bold px-1">ICORE</h1>
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              Welcome to ICORE! We're excited to have you on board. Please
              confirm your email by clicking the link below:
            </Text>
            <Button style={button} href={confirmEmailLink}>
              Confirm Your Account
            </Button>
            <Text style={text}>
              If you did not create an account with us, please ignore this
              email.
            </Text>
            <Text style={text}>Thanks, The ICORE Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

EmailConfirmationTemplate.PreviewProps = {
  userFirstname: "ICORE",
  confirmEmailLink: "https://www.dropbox.com",
} as EmailConfirmationTemplateProps;

export default EmailConfirmationTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "black",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
