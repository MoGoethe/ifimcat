import React from "react";
import classNames from "classnames";
import RowContext from "./RowContext";
import "./index.scss";

export function Row(props) {
  const {
    className,       // 自定义类名
    style = {},        // 自定义样式
    width,           // 宽度
    gutter,          // 间隔 [左右间隔， 上下间隔]
    ...rest          // 其他自定义属性
  } = props;

  const cls = classNames('if-row', className);

  if (width) {
    style.width = `${width}px`;
  }

  if (gutter) {
    const x = gutter[0] || 0;
    const y = gutter[1] || 0;
    style.margin = `-${y / 2}px -${x / 2}px ${y / 2}px`
  }

  return (
    <RowContext.Provider value={gutter}>
      <div className={cls} style={style} {...rest}>
        {props.children}
      </div>
    </RowContext.Provider>
  )
}