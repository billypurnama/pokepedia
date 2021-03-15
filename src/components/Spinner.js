import React from 'react'
/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'

const spin1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`

const spin2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`

const spin3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`

const spinner = css`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  & div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fa2d48;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & div:nth-of-type(1) {
    left: 8px;
    animation: ${spin1} 0.6s infinite;
  }
  & div:nth-of-type(2) {
    left: 8px;
    animation: ${spin2} 0.6s infinite;
  }
  & div:nth-of-type(3) {
    left: 32px;
    animation: ${spin2} 0.6s infinite;
  }
  & div:nth-of-type(4) {
    left: 56px;
    animation: ${spin3} 0.6s infinite;
  }
`

function Spinner() {
  return (
    <>
      <div css={spinner}>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </>
  )
}

export default Spinner
