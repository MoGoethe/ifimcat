import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import classNames from "classnames";
import "./index.scss";
import {
  categories
} from "../../mock";

export function Navigation(props) {

  const {
    className,
    ...rest
  } = props;
  const cls = classNames("if-navigation", className);

  const [keywords, setKeywords] = useState("");
  const history = useHistory();

  const search = () => {
    history.push(`/search?keywords=${keywords}`);
  }
  const onEnter = e => {
    if (e.keyCode === 13) {
      search();
    }
  }

  return (
    <div className={cls} {...rest}>
      <div className="if-navigation--left">
        <a className="if-navigation__logo" href="/">Ifimcat.com</a>
        <div className="if-navigation-nav">
          {
            categories.map((category, index) => (
              <a href={`/category/${category.key}`} key={`category--${index}`} className="if-navigation-item">{category.name}</a>
            ))
          }
        </div>
      </div>
      <div className="if-navigation--right">
        <div className="if-navigation-search">
          <input
            type="text"
            className="if-navigation-search__input"
            onChange={e => setKeywords(e.target.value)}
            placeholder="keywords"
            value={keywords}
            onKeyDown={onEnter}
          />
          <button className="if-navigation-search__btn" onClick={search}></button>
        </div>
      </div>
    </div>
  )
};
