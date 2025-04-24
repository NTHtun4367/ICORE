import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface PasswordResetEmailProps {
  username?: string;
  updatedDate?: Date;
  resetPasswordLink: string;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

export const PasswordResetEmail = ({
  username,
  updatedDate,
  resetPasswordLink,
}: PasswordResetEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(updatedDate);

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          You requesetd to updated the password for your ICORE account
        </Preview>
        <Container style={container}>
          <Section style={logo}>
            <h2 style={logoTitle}>ICORE</h2>
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hi {username},</Text>
            <Text style={paragraph}>
              You updated the password for your ICORE account on {formattedDate}
              . If this was you, then no further action is required.
            </Text>
            <Text style={paragraph}>
              However if you did NOT perform this password change, please reset
              your account password immediately.
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Change new password
            </Button>
            <Text style={paragraph}>
              Still have questions? Please contact{" "}
              <Link href="#" style={link}>
                ICORE Support
              </Link>
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              ICORE Support Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

PasswordResetEmail.PreviewProps = {
  username: "ICORE user",
  updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
} as PasswordResetEmailProps;

export default PasswordResetEmail;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  padding: 30,
};

const logoTitle = {
  textAlign: "center" as const,
  fontSize: "28px",
  fontWeight: "600",
  color: "black",
};

const button = {
  backgroundColor: "black",
  borderRadius: "4px",
  color: "white",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const sectionsBorders = {
  width: "100%",
};

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid rgb(145,71,255)",
  width: "102px",
};

const link = {
  textDecoration: "underline",
};
