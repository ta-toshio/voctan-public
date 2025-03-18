"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import Social from "@/components/blocks/auth/social";

import AuthHeader from "./auth-header";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  title: string;
  showSocial?: boolean;
  backButtonHref: string;
  signUp?: boolean;
}

const CardWrapper = (
  {
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    title,
    showSocial,
    signUp = false,
  }: CardWrapperProps) => {
  return (
    <Card className="">
      <CardHeader>
        <AuthHeader label={headerLabel} title={title}/>
      </CardHeader>
      <CardContent>
        {children}
        {showSocial && (
          <Social signUp={signUp}/>
        )}
      </CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}/>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
