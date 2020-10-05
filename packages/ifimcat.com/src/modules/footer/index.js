import React from "react";
import classnames from "classnames";
import {
  Row,
  Col
} from "../../components/grid";
import "./index.scss";

export function Footer(props) {
  
  const {
    className,
    ...rest
  } = props;

  const cls = classnames("if-footer", className);

  return (
    <div className={cls} {...rest}>
      <Row>
        <Col colSpan={8}>
          <div className="if-footer-info">
            Made with ♥ remotely from
            <a href="https://github.com/MoGoethe/" target="_blank" rel="noopener noreferrer"> MoGoethe</a>
          </div>
        </Col>
        <Col colSpan={8}>
          <div className="if-footer-info">
            Copyright © 2020-2022 Ifimcat.com. |
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer"> 粤ICP备17044077号</a>
          </div>
        </Col>
        <Col colSpan={8}>
          <div className="if-footer-info"><b>20,248 </b> articles in ifimcat</div>
        </Col>
      </Row>
    </div>
  )
}
