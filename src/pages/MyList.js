import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useHistory } from 'react-router-dom'
import Modal from '../components/Modal'
import * as MdIcons from 'react-icons/md'

const flex = css({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
})

const container = css({
  padding: '20px',
})

const wrapper = css({
  flexDirection: 'column',
}, {...flex})

const card = css({
  alignItems: 'center',
  borderRadius: '4px',
  boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '15px',
  padding: '0 15px',
  width: '100%',
  '& > svg:first-of-type': {
    transform: 'scale(1.5)',
    color: 'rgb(252,194,0)',
    zIndex: '-1',
  },
  '& > svg:last-child': {
    transform: 'scale(2)',
    '&:hover': {
      color: '#fa2d48',
    }
  },
  '& > p': {
    marginRight: '20px',
    textTransform: 'capitalize',
  }
})

const emptyText = css({
  flexDirection: 'column',
  fontSize: '30px',
  marginBottom: '30px',
  marginTop: '200px',
}, {...flex})

const button = css({
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

const modalSlot = css({
  flexDirection: 'column',
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
  '& > div': {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    '& > button': {
      border: 'none',
      borderRadius: '4px',
      boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      cursor: 'pointer',
      fontSize: '20px',
      fontWeight: 'bold',
      letterSpacing: '4px',
      padding: '10px',
      textTransform: 'uppercase',
      width: '100%',
      margin: '0 5px',
    },
    '& > button:first-of-type': {
      background: '#fff',
      color: '#fa2d48',
    },
    '& > button:last-child': {
      background: '#fa2d48',
      color: '#fff',
    },
  },
  '& > *': {
    margin: '12px 0',
  }
}, {...flex})

function MyList() {
  const [modalShow, setModalShow]= useState(false)
  const [pokemonIndex, setPokemonIndex]= useState(-1)
  const pokemonData = JSON.parse(sessionStorage.getItem('pokemonData'))

  const history = useHistory()

  function showModal (index) {
    setModalShow(true)
    setPokemonIndex(index)
  }

  const handleDelete = () => {
    const tempData = [...pokemonData]
    tempData.splice(pokemonIndex, 1)
    const newData = [...tempData]
    sessionStorage.removeItem('pokemonData')
    sessionStorage.setItem('pokemonData', JSON.stringify(newData))
    setModalShow(false)
  }

  return (
    <div css={container}>
      <Modal visible={modalShow} slot={ 
        <div css={modalSlot}>
          <MdIcons.MdError />
          <p>Remove from your list?</p>
          <div>
            <button onClick={() => {setModalShow(false)}}>No</button>
            <button onClick={handleDelete}>Yes</button>
          </div>
        </div>
       } />
      <div css={wrapper}>
        {
          pokemonData && pokemonData.length ?
            <>
              {
                pokemonData.map((data, index) => {
                  return (
                    <div key={index} css={card}>
                      <MdIcons.MdStar />
                      <img 
                        src={data.sprites.front_default} 
                        alt="Pokemon Avatar"
                        draggable="false" />
                      <p>{data.name}</p>
                      <MdIcons.MdDelete onClick={() => { showModal(index) }} />
                    </div>
                  )
                })
              }
            </> :
            <>
              <p css={emptyText}>Your Pokémon list is empty!</p>
              <button css={button} onClick={() => { history.push('/') }}>Catch Some!</button>
            </>
        }
      </div>
    </div>
  )
}

export default MyList
