import React, {useState, useEffect} from "react";
import classnames from "classnames";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./index.scss";

/*
  carousels: 轮播内容    必选
  active: 初始展示的轮播页码
  dealy:  轮播间隔
  action: 是否展示上下页切换
*/
let timer = null;
export function Carousel(props) {

  const {
    dealy= 5000,
    action= false,
    dots= false,
    width,
    height,
    className,
    style={},
    data = [],
    render,
    ...rest
  } = props;

  const [actived, setActived] = useState(props.actived || 0);

  const play = () => {
    setActived((actived + 1) % data.length);
  };

  const prev = () => {
    if (timer) {
      clearInterval(timer)
    }
    const prevIndex = (actived - 1) < 0 ? data.length - 1 : actived - 1
    setActived(prevIndex % data.length);
    timer = setInterval(play, dealy);
  }
  const next = () => {
    if (timer) {
      clearInterval(timer)
    }
    setActived((actived + 1) % data.length);
    timer = setInterval(play, dealy);
  }

  useEffect(() => {
    timer = setInterval(play, dealy);
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  })

  const togoActive = index => {
    timer && clearInterval(timer);
    setActived(index);
    timer = setInterval(play, dealy);
  };

  const cls = classnames("if-carousel", className);
  if (width) {
    style.width = `${width}px`;
  }
  if (height) {
    style.height = `${height}px`;
  }
  return (
    <div className={cls} style={style} {...rest}>
      <div className="if-carousel__list">
        <TransitionGroup>
          {
            data.map((item, index) => {
              if (index === actived){
                return <CSSTransition
                  key={index}
                  classNames="if-carousel__list--transition"
                  timeout={500}
                  appear={true}
                  onEnter={props.onEnter && props.onEnter()}
                  onExit={props.onExit && props.onExit()}
                >
                  <div className="if-carousel__item">
                    {render ? render(item, index) : <CarouselItem data={item} />}
                  </div>
                </CSSTransition>
              }
              return null
            })
          }
        </TransitionGroup>
      </div>
      {
        action && <div className="if-carousel__action">
          <span className="if-carousel__action--left" onClick={prev} />
          <span className="if-carousel__action--right" onClick={next} />
        </div>
      }
      {
        dots && <div className="if-carousel__dot">
          {
            data.map((_, index)=> <span
              key={index}
              className={index === actived ? "if-carousel__dot-item actived" : "if-carousel__dot-item"} 
              onClick={() => togoActive(index)} 
            />)
          }
        </div>
      }
    </div>
  )
}

function CarouselItem(porps) {
  const { data } = porps;
  return (
    <div className="if-carousel-main" style={{backgroundImage: `url(${data.image})`}}>
      <div className="carousel-content">
        <h3 className="if-carousel__title">{data.title}</h3>
        <p className="if-carousel__description">{data.description}</p>
      </div>
    </div>
  )
}