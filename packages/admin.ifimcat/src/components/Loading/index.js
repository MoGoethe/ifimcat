import React from "react";

export function Loading() {

  return (
    <div class="loader">
      <div class="loader-inner loader--one"></div>
      <div class="loader-inner loader--two"></div>
      <div class="loader-inner loader--three"></div>
    </div>
  )
}

export function LoadingBar() {

  return (
    <div className="loading-bar">
      <div className="light"></div>
    </div>
  )
}