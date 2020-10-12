import React from "react";
import "./index.scss";

export function Break404(props) {

  return (
    <div className="if-break if-break--404">
      <div className="if-break__title">Oooooooooops <span>404 !!!</span></div>
      <div className="if-break__description">
        Seems like you've found an article, yet to be written.
      </div>
    </div>
  )
}

export function Break500(props) {

  return (
    <div className="if-break if-break--404">
      <div className="if-break__title">Oooooooooops <span>500 !!!</span></div>
      <div className="if-break__description">
        Sorry, all of our servers are busy right now.
      </div>
    </div>
  )
}