import { lazy } from "react";
import ElderContent from "../../content/ElderContent.json";

const ElderBlock = lazy(() => import("../../components/ElderBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ElderBlock
        title={ElderContent.title}
        content={ElderContent.text}
        button={ElderContent.button}
      />
    </Container>
  );
};

export default Home;
