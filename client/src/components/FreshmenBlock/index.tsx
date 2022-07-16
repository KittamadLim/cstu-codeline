import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Fade } from "react-awesome-reveal";
import { MiddleBlockSection, ContentWrapper } from "./styles";
import TextArea from "../../common/TextArea";
import Input from "../../common/Input";
import jwtDecode from "jwt-decode";
import { useState } from "react";

interface UserData {
  firstname: string;
  lastname: string;
  nickname: string;
  hint1: string;
  hint2: string;
  hint3: string;
  hint4: string;
}

interface FreshmenBlockProps {
  title: string;
  content: string[];
  button: string;
  t: any;
}

const MiddleBlock = ({ title, content, button, t }: FreshmenBlockProps) => {
  const [user] = useState<UserData>(
    jwtDecode(localStorage.getItem("$IevTd") as string)
  );

  return (
    <MiddleBlockSection>
      <Fade direction="right">
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6 className="app">{t(title) + user.nickname}</h6>
              <TextArea
                name="คำใบ้รอบที่ 1"
                placeholder=""
                value={user.hint1}
                onChange={() => {}}
              />
              <TextArea
                name="คำใบ้รอบที่ 2"
                placeholder=""
                value={user.hint2}
                onChange={() => {}}
              />
              <TextArea
                name="คำใบ้รอบที่ 3"
                placeholder=""
                value={user.hint3}
                onChange={() => {}}
              />
              <TextArea
                name="คำใบ้รอบที่ 4"
                placeholder=""
                value={user.hint4}
                onChange={() => {}}
              />
            </Col>
          </ContentWrapper>
        </Row>
      </Fade>
    </MiddleBlockSection>
  );
};

export default withTranslation()(MiddleBlock);
