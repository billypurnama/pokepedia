import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import { GET_POKEMON_DETAIL } from '../graphql/pokemon'
import { getColor } from '../utils/pokemonTypeColor'
import * as MdIcons from 'react-icons/md'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'

const flex = css({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
})

const container = css({
  padding: '20px',
}, {...flex})

const wrapper = css({
  boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  borderRadius: '4px',
  flexDirection: 'column',
  width: '80%',
}, {...flex})

const pokemonWrapper = css({
  textTransform: 'capitalize',
  flexDirection: 'column',
  padding: '20px',
  '& img': {
    transform: 'scale(1.6)',
    zIndex: '-1',
    marginBottom: '10px'
  },
}, {...flex})

const pokemonName = css({
  background: '#fa2d48',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  color: '#fff',
  fontWeight: 'bold',
  letterSpacing: '4px',
  marginBottom: '10px',
  padding: '10px 5px',
  textAlign: 'center',
  textShadow: '0 .125rem .25rem rgba(0, 0, 0, .4)',
  textTransform: 'uppercase',
  width: '100%',
})

const pokemonDesc = css({
  flexDirection: 'column',
  marginTop: '20px',
}, {...flex})

const pokemonType = css({
  textTransform: 'capitalize',
  fontWeight: 'bold',
  '& > div': {
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    borderRadius: '4px',
    padding: '10px',
    margin: '5px'
  }
}, {...flex})

const icon = css({
  margin: '15px 0',
  transform: 'scale(1.5)',
  zIndex: '-1',
  color: '#fa2d48',
})

const catchButton = css({
  border: 'none',
  background: '#fa2d48',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '20px',
  fontWeight: 'bold',
  letterSpacing: '4px',
  padding: '10px',
  textShadow: '0 .125rem .25rem rgba(0, 0, 0, .4)',
  textTransform: 'uppercase',
  width: '100%',
})

const successSlot = css({
  flexDirection: 'column',
  padding: '10px',
  '& > input': {
    background: '#fafafa',
    borderRadius: '5px',
    boxShadow: 'inset 0 1px 3px 0 rgb(0 0 0 / 8%)',
    color: '#666',
    fontSize: '16px',
    lineHeight: '50px',
    padding: '0 20px',
    transition: 'all .4s ease',
    width: '100%',
  },
  '& > p': {
    fontSize: '20px',
    letterSpacing: '1.2px',
    textAlign: 'center',
  },
  '& > svg': {
    color: 'mediumseagreen',
    marginBottom: '30px',
    transform: 'scale(4)',
  },
  '& > button': {
    ...catchButton,
    fontSize: '16px',
  },
  '& > *': {
    margin: '6px 0',
  }
}, {...flex})

const failedSlot = css({
  flexDirection: 'column',
  padding: '10px',
  '& > p': {
    fontSize: '20px',
    letterSpacing: '1.2px',
    textAlign: 'center',
  },
  '& > svg': {
    color: '#fa2d48',
    marginBottom: '30px',
    transform: 'scale(4)',
  },
  '& > button': {
    ...catchButton,
    fontSize: '16px',
  },
  '& > *': {
    margin: '12px 0',
  }
}, {...flex})

function PokemonDetail() {
  let nickname = ''
  const [slot, setSlot] = useState({})
  const [modalShow, setModalShow]= useState(false)

  const variables = {
    name: useLocation().pokemon
  }
  
  const { loading, data } = useQuery(GET_POKEMON_DETAIL, { variables })

  if (loading) return(<Modal visible={loading} slot={<Spinner />} />)

  function handleSuccessModal () {
    setModalShow(false)
    const name = nickname.length ? nickname : data.pokemon.name
    const pokemonData = {
      ...data.pokemon,
      name,
    }
    const prevData = sessionStorage.getItem('pokemonData')
    if (prevData) {
      const prev = JSON.parse(prevData)
      prev.push(pokemonData)
      sessionStorage.setItem('pokemonData', JSON.stringify(prev))
    } else {
      sessionStorage.setItem('pokemonData', JSON.stringify([pokemonData]))
    }
    
    nickname = ''
  }

  function success () {
    return (
      <div css={successSlot}>
        <MdIcons.MdCheckCircle />
        <p>You've successfully catch this pokemon!</p>
        <input 
          type="text" 
          placeholder="Please enter a nickname"
          onInput={e => { nickname = e.target.value }} />
        <button onClick={() => {handleSuccessModal()}}>Add to My List</button>
      </div>
    )
  }

  function failed () {
    return (
      <div css={failedSlot}>
        <MdIcons.MdError />
        <p>You've failed to catch this pokemon!</p>
        <button onClick={() => {setModalShow(false)}}>Try Again</button>
      </div>
    )
  }

  const catchPokemon = () => {
    const chance = Math.round(Math.random() * 1) // 0 or 1
    if (chance === 0) {
      // Success Chance
      setSlot(success)
    } else {
      // Failed Chance
      setSlot(failed)
    }
    setModalShow(true)
  }

  return (
    <div css={container}>
      <Modal visible={modalShow} slot={slot} />
      <div css={wrapper}>
        {
          data && 
          <>
            <div css={pokemonName}>{data.pokemon.name}</div>
            <div css={pokemonWrapper}>
              <img 
                src={data.pokemon.sprites.front_default} 
                alt="Pokemon Avatar"
                draggable="false" />
              <div css={pokemonDesc}>
                <div css={pokemonType}>
                  {
                    data.pokemon.types.map((type, index) => {
                      const colorType = type.type.name.toLowerCase()
                      const style = {
                        color: getColor(colorType).color,
                        background: getColor(colorType).backgroundColor,
                      }
                      return (
                        <div style={style} key={index}>{type.type.name}</div>
                      )
                    })
                  }
                </div>
                <MdIcons.MdGames css={icon} />
              </div>
              <button css={catchButton} onClick={catchPokemon}>Catch</button>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default PokemonDetail
