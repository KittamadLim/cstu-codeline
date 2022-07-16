import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import jwtDecode from "jwt-decode";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";
import axios from "axios";
import swal from "sweetalert";

interface UserData {
  raw_name: string;
  nickname: string;
  role: string;
}

const Header = ({ t }: any) => {
  const [visible, setVisibility] = useState(false);
  if (localStorage.getItem("$IevTd")) {
    var token = jwtDecode(localStorage.getItem("$IevTd") as string);
  }
  const [user] = useState<UserData>((token as UserData) || null);

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };
    return (
      <>
        {user?.role === "freshmen" ? (
          <CustomNavLinkSmall
            onClick={() => (window.location.href = "/freshmen")}
          >
            <Span>{t("เช็คคำใบ้กัน")}</Span>
          </CustomNavLinkSmall>
        ) : null}
        {user?.role === "elder" ? (
          <CustomNavLinkSmall onClick={() => (window.location.href = "/elder")}>
            <Span>{t("เช็คน้องรหัสกัน")}</Span>
          </CustomNavLinkSmall>
        ) : null}

        <CustomNavLinkSmall
          style={{ width: "180px" }}
          onClick={() => {
            if (user) {
              localStorage.removeItem("$IevTd");
              localStorage.removeItem("authenticate");
              delete axios.defaults.headers.common["Authorization"];
              swal(
                "ออกจากระบบเรียบร้อย",
                "ระบบจะนำทางไปยังหน้าหลัก",
                "success"
              ).then(() => (window.location.href = "/"));
            } else {
              if (window.location.pathname === "/") {
                scrollTo("login");
              } else {
                window.location.href = "/";
              }
            }
          }}
        >
          <Span>
            <Button>{user ? t("ออกจากระบบ") : t("เข้าไปเช็คกันเลย")}</Button>
          </Span>
        </CustomNavLinkSmall>
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="new_logo.svg" width="101px" height="64px" />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={showDrawer}>
            <Outline />
          </Burger>
        </Row>
        <Drawer
          closable={false}
          visible={visible}
          onClose={onClose}
          className="app"
        >
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={onClose}>
              <Col span={12}>
                <Menu className="app">เมนู</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
