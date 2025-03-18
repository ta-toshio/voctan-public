import {Container, Main, Section} from "@/components/ui/craft";

export default function LoggedInLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <Main className="bg-slate-100 min-h-[calc(100dvh-64px)]">
      <Section>
        <Container>
          {children}
        </Container>
      </Section>
    </Main>
  );
}
