import { withTranslation } from "react-i18next";
import { Container, StyledInput } from "./styles";
import { Label } from "../TextArea/styles";
import { InputProps } from "../types";

const Input = ({ name, type, placeholder, onChange, readOnly, t }: InputProps) => (
  <Container>
    <Label htmlFor={name}>{t(name)}</Label>
    <StyledInput
      placeholder={t(placeholder)}
      type={type}
      name={name}
      id={name}
      onChange={onChange}
      readOnly={readOnly}
    />
  </Container>
);

export default withTranslation()(Input);
