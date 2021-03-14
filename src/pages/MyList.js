import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const container = css({
  display: 'flex',
  height: '90vh',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '3rem',
})

function MyList() {
  return (
    <div css={container}>
      <h1>My Pokémon List</h1>
    </div>
  )
}

export default MyList
