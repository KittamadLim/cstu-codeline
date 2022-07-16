import { StyledContainer } from "./styles";
import { ContainerProps } from "../types";
import "../../index.css";

const Container = ({ border, children }: ContainerProps) => (
  <StyledContainer border={border} className="app">{children}</StyledContainer>
);

export default Container;
