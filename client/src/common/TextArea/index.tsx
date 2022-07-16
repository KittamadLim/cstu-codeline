import { withTranslation } from "react-i18next";
import { StyledTextArea, StyledContainer, Label } from "./styles";
import { InputProps } from "../types";

const TextArea = ({ name, value, onChange, t }: InputProps) => (
  <StyledContainer>
    <Label htmlFor={name}>{t(name)}</Label>
    <StyledTextArea
      value={t(value)}
      id={name}
      name={name}
      onChange={onChange}
    />
  </StyledContainer>
);

export default withTranslation()(TextArea);
