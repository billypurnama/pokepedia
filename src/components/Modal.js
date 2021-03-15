import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const container = css({
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, .8)',
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  left: '0',
  position: 'absolute',
  top: '0',
  width: '100%',
  zIndex: '999',
})

const wrapper = css({
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: '4px',
	boxShadow: `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`,
  display: 'flex',
  height: '300px',
  justifyContent: 'center',
  width: '300px',
})

function Modal({ slot, visible }) {
  return (
    <>
      {
        visible && 
        <div css={container}>
          <div css={wrapper}>
            {slot}
          </div>
        </div>
      }
    </>
  )
}

export default Modal
