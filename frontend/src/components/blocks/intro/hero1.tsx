import { Section, Container } from "@/components/ui/craft";

import { Button } from "../../ui/button";

const Hero1 = () => {
  return (
    <Section className="relative backdrop-blur-sm">
      <Container className="flex flex-col gap-8">
        <h1 className="!mb-0">
          What if building landing pages was as easy as copy and paste?
        </h1>
        <h3 className="rounded-md border bg-muted/50 p-4 text-muted-foreground">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h3>

        <div className="flex gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero1;
