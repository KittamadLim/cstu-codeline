import { withTranslation } from "react-i18next";
import { Container, TextWrapper, Content, Content2 } from "./styles";

interface Props {
  title: string;
  content: string;
  t: any;
}

const Block = ({ title, content, t }: Props) => {
  return (
    <Container>
      <h6>{t(title)}</h6>
      <TextWrapper>
        <Content>{t(content)}</Content>
        <Content2 style={{fontSize: "1em", color: "red"}}>
          {
            "*รหัสนักศึกษาและรหัสผ่านมีไว้ใช้เพื่อยืนยันตัวตนผ่าน API ของมหาวิทยาลัยเท่านั้น ไม่มีการเก็บข้อมูลดังกล่าวลงฐานข้อมูล*"
          }
        </Content2>
      </TextWrapper>
    </Container>
  );
};

export default withTranslation()(Block);
