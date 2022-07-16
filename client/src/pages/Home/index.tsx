/* eslint-disable @typescript-eslint/no-unused-vars */
import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import ContactContent from "../../content/ContactContent.json";

const Contact = lazy(() => import("../../components/ContactForm"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="developer.svg"
        id="intro"
      />
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="login"
      />
    </Container>
  );
};

export default Home;
