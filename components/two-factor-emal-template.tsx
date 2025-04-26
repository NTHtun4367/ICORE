import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type TwoFactorCodeEmailProps = {
  twoFactorCode: string;
};

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

export const TwoFactorCodeEmail = ({
  twoFactorCode,
}: TwoFactorCodeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your authentication code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={title}>ICORE</Text>
        <Heading style={secondary}>Your authentication code </Heading>
        <Text style={paragraph}>
          Enter it in the OTP and press the verify button. This code will expire
          in 15 minutes.
        </Text>
        <Section style={codeContainer}>
          <Text style={code}>{twoFactorCode}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

TwoFactorCodeEmail.PreviewProps = {
  twoFactorCode: "144833",
} as TwoFactorCodeEmailProps;

export default TwoFactorCodeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eee",
  borderRadius: "5px",
  boxShadow: "0 5px 10px rgba(20,50,70,.2)",
  marginTop: "20px",
  maxWidth: "360px",
  margin: "0 auto",
  padding: "68px 0 130px",
};

const title = {
  color: "black",
  fontSize: "28px",
  fontWeight: "bold",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  textTransform: "uppercase" as const,
  textAlign: "center" as const,
};

const secondary = {
  color: "#000",
  fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "24px",
  marginBottom: "5px",
  marginTop: "0",
  textAlign: "center" as const,
};

const codeContainer = {
  background: "rgba(0,0,0,.05)",
  borderRadius: "4px",
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
};

const code = {
  color: "#000",
  fontFamily: "HelveticaNeue-Bold",
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "6px",
  lineHeight: "40px",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0 auto",
  display: "block",
  textAlign: "center" as const,
};

const paragraph = {
  color: "#444",
  fontSize: "15px",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  letterSpacing: "0",
  lineHeight: "23px",
  padding: "0 40px",
  margin: "0",
  textAlign: "center" as const,
};
