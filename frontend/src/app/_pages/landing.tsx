import { Container, Main, Section } from "@/components/ui/craft";
import Hero from "@/components/blocks/intro/hero";
import Feature from "@/components/blocks/intro/feature";
import Footer from "@/components/blocks/intro/footer";
import { Services } from "@/components/blocks/intro/service";

export default function Landing() {
  return (
    <Main className="bg-gradient-to-r from-yellow-50 to-orange-100">
      <Section>
        <Container>
          <Hero/>
          <Feature/>
          <Services/>
        </Container>
      </Section>
      <Footer/>
    </Main>
  )
}
