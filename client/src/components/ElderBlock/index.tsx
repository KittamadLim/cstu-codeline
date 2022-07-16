import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Fade } from "react-awesome-reveal";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { Card, Space } from "antd";

const { Meta } = Card;

interface UserData {
  firstname: string;
  lastname: string;
  nickname: string;
  codeline: FreshmenData[];
}

interface FreshmenData {
  codeline_student_id: string;
  codeline_firstname: string;
  codeline_lastname: string;
  codeline_nickname: string;
  codeline_ig: string;
  codeline_facebook: string;
  codeline_favorite_food: string;
  codeline_wording: string;
}

interface ElderBlockProps {
  title: string;
  content: string;
  button: string;
  t: any;
}

const ElderBlock = ({ title, content, button, t }: ElderBlockProps) => {
  const [user] = useState<UserData>(
    jwtDecode(localStorage.getItem("$IevTd") as string)
  );

  return (
    <MiddleBlockSection>
      <Fade direction="right">
        <Row justify="center" align="top">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6 className="app">{t(title) + user.nickname}</h6>
              <Content>{t(content)}</Content>
            </Col>
          </ContentWrapper>
        </Row>
        <Row>
          {user.codeline.map((freshmen, index) => {
            return (
              <Col key={index} xs={24} lg={24 / user.codeline.length}>
                <Space align="start">
                  <Card
                    style={{ width: 300, textAlign: "left", margin: "1em" }}
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src={`http://web.reg.tu.ac.th/registrar/getstudentimage.asp?id=${freshmen.codeline_student_id}&Status=10`}
                      />
                    }
                  >
                    <Meta
                      title={
                        freshmen.codeline_firstname +
                        " " +
                        freshmen.codeline_lastname + " (" + freshmen.codeline_nickname + ")"
                      }
                      description={[
                        <div>
                          <strong>Instagram:</strong> {freshmen.codeline_ig}
                          <br />
                          <strong>Facebook:</strong>{" "}
                          {freshmen.codeline_facebook}
                          <br />
                          <strong>อาหารที่ชอบ:</strong>{" "}
                          {freshmen.codeline_favorite_food}
                          <br />
                          <strong>ความในใจถึงพี่รหัส:</strong>{" "}
                          {freshmen.codeline_wording}
                        </div>,
                      ]}
                    />
                  </Card>
                </Space>
              </Col>
            );
          })}
        </Row>
      </Fade>
    </MiddleBlockSection>
  );
};

export default withTranslation()(ElderBlock);
