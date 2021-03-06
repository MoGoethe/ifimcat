import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import classNames from "classnames";
import { useQuery } from '@apollo/react-hooks';
import { Q_NAVIGATION } from "../../queries";
import "./index.scss";
// import {
//   categories
// } from "../../mock";

export function Navigation(props) {

  const {
    className,
    ...rest
  } = props;
  const cls = classNames("if-navigation", className);
  const { data = {} } = useQuery(Q_NAVIGATION);

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
        <span className="if-navigation__logo" onClick={() => history.push(`/`)}>Ifimcat.com</span>
        <div className="if-navigation-nav">
          {
            data.getCategories && data.getCategories.map((category, index) => (
              <a
                key={`category--${index}`}
                className="if-navigation-item"
                href={`/category/${category.key}`}
              >{category.name}</a>
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
            placeholder="Keywords"
            value={keywords}
            onKeyDown={onEnter}
          />
          <button className="if-navigation-search__btn" onClick={search}></button>
        </div>
      </div>
    </div>
  )
};
