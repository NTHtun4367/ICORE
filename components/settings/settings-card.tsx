import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type SettingsCardProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

const SettingsCard = ({ children, title, description }: SettingsCardProps) => {
  return (
    <Card>
      <CardHeader>
        {title && children && (
          <>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </>
        )}
        {children}
      </CardHeader>
    </Card>
  );
};

export default SettingsCard;
