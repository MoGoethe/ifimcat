import React, { Fragment } from "react";
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
  const eibook = 'eibook';
  // const ifimcat = 'ifimcat';
  const host = window.location.host;

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
            Copyright © 2020-2022 Ifimcat.com.
            {
              host.includes(eibook) ?
                <Fragment>|
                  <a href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    粤ICP备17044077号
                  </a>
                </Fragment> : null
            }            
          </div>
        </Col>
        <Col colSpan={8}>
          <div className="if-footer-info"><b>10 </b> articles in ifimcat</div>
        </Col>
      </Row>
    </div>
  )
}
