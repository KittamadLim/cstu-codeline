import { lazy } from "react";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
const FreshmenBlock = lazy(() => import("../../components/FreshmenBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <FreshmenBlock
        title={MiddleBlockContent.title}
        content={(MiddleBlockContent.text as unknown as string[])}
        button={MiddleBlockContent.button}
      />
    </Container>
  );
};

export default Home;
