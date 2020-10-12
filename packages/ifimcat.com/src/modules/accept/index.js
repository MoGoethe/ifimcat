import React from "react";
import notificaty from "../../components/notificaty";
import "./index.scss"

export function Accept(props) {

  return (
    <div className="if-accept">
      <div className="if-accept-main">
        <div className="if-accept__text">First publication by <a href="/">Ifimcat</a> about the artcile.</div>
        <div className="if-accept-btn">
          <span className="if-accept__btn" onClick={() => notificaty.info(`请使用 "Ctrl/Command + D" 进行页面收藏哦！`)}>Favorites</span>
        </div>
      </div>
    </div>
  )
}