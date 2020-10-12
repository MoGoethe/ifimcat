import React from "react";
import { Carousel } from "../../components/carousel";
import { BANNERBGCOLOR } from "../../config"
import "./index.scss"

function bannerItemRender(banner, index) {
  console.log(banner)
  let bgColor = '';
  switch (index) {
    case 0: bgColor = BANNERBGCOLOR[0]; break;
    case 1: bgColor = BANNERBGCOLOR[1]; break;
    case 2: bgColor = BANNERBGCOLOR[2]; break;
    case 3: bgColor = BANNERBGCOLOR[3]; break;
    default: bgColor = BANNERBGCOLOR[0];
  }
  return (
    <div className="if-banner-item" style={{ backgroundColor: bgColor }} data-title={banner.name}>
      <div className="banner-main">
        <p className="banner-main__title">{banner.name}</p>
        <ul className="banner-main-list">
          {
            banner.blogs.map((i, j) => {
              if (j >3) {
                return null
              }
              return (
                <li className="banner-main-item" key={`banner-main-item--${j}`}>
                  <a href={`/article/${i.key}`}>{i.title}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export function Banner(props) {

  return (
    <Carousel {...props} render={bannerItemRender} />
  )
}