import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useQuery } from '@apollo/client'
import { GET_POKEMONS } from '../graphql/pokemon'
import { useHistory } from 'react-router-dom'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'

const container = css({
  padding: '20px 0',
})

const wrapper = css({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  '@media(min-width: 850px)': {
    justifyContent: 'flex-start',
  }
})

const card = css`
  align-items: center;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 8px;
  padding: 10px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  &:hover {
    transform: scale(1.1);
    transition: all 150ms ease-in-out;
  }
  & > img {
    height: 150px;
    width: 150px;
  }
  & > p {
    font-size: 20px;
    text-transform: capitalize;
  }
`
const title = css`
  letter-spacing: 1.05px;
  margin: 10px 0;
  padding: 0 20px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

function PokemonList() {
  const variables = {
    limit: 30,
    offset: 0,
  }
  
  const { loading, data } = useQuery(GET_POKEMONS, { variables })

  const pokemonData = JSON.parse(sessionStorage.getItem('pokemonData'))

  const history = useHistory()

  function handleCardClick (pokemon) {
    history.push({
      pathname: '/pokemon-detail',
      pokemon,
    })
  }

  if (loading) return(<Modal visible={loading} slot={<Spinner />} />)

  return (
    <div css={container}>
      <p css={title}>
        {
          `Total Pokémon Owned : ${pokemonData && pokemonData.length ? pokemonData.length : 0}`
        }
      </p>
      <div css={wrapper}>
        {
          data && data.pokemons.results.map(pokemon => {
            return (
              <div 
                css={card} 
                key={pokemon.url}
                onClick={() => { handleCardClick(pokemon.name) }}>
                <img 
                  src={pokemon.image} 
                  alt="Pokemon Avatar"
                  draggable="false" />
                <p>{pokemon.name}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default PokemonList
