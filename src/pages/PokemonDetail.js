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

function PokemonDetail() {
  return (
    <div css={container}>
      <h1>Pokémon Detail</h1>
    </div>
  )
}

export default PokemonDetail
