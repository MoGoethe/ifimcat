import React, { useContext } from "react";
import classNames from "classnames";
import RowContext from "./RowContext";
import "./index.scss";

export function Col(props) {
  const gutter = useContext(RowContext);
  const {
    className,       // 自定义类名
    style,           // 自定义样式
    width,           // 宽度 
    pull,            // 左间隔 以栅格数为单位
    push,            // 右间隔 以删格数为单位
    colSpan,         // 宽度，最大值为24，栅格为24栅格
    ...rest          // 自定义其他属性
  } = props;
  const cls = classNames('if-col', {
    [`if-col-${colSpan}`]: colSpan,
    [`if-col--push-${push}`]: push,
    [`if-col--pull-${pull}`]: pull,
  }, className);
  const styles = {
    ...style,
    width: `${width}px`,
  };

  if (gutter) {
    const x = gutter[0] || 0;
    const y = gutter[1] || 0;
    styles.padding = `${y / 2}px ${x / 2}px`;
  }

  return (
    <div className={cls} style={styles} {...rest}>
      {props.children}
    </div>
  )
}