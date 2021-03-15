export const getColor = (POKEMON_TYPE) => {
  switch (POKEMON_TYPE) {
    case 'normal':
      return {
        backgroundColor: '#797964',
        color: '#fff',
      }
    case 'fire':
      return {
        backgroundColor: '#d52100',
        color: '#fff',
      }
    case 'water':
      return {
        backgroundColor: '#0080ff',
        color: '#fff',
      }
    case 'grass':
      return {
        backgroundColor: '#5cb737',
        color: '#fff',
      }
    case 'electric':
      return {
        backgroundColor: '#c90',
        color: '#fff',
      }
    case 'psychic':
      return {
        backgroundColor: '#ff227a',
        color: '#fff',
      }
    case 'ice':
      return {
        backgroundColor: '#0af',
        color: '#fff',
      }
    case 'dragon':
      return {
        backgroundColor: '#4e38e9',
        color: '#fff',
      }
    case 'dark':
      return {
        backgroundColor: '#573e31',
        color: '#fff',
      }
    case 'fairy':
      return {
        backgroundColor: '#e76de7',
        color: '#fff',
      }
    case 'fighting':
      return {
        backgroundColor: '#a84d3d',
        color: '#fff',
      }
    case 'steel':
      return {
        backgroundColor: '#8e8ea4',
        color: '#fff',
      }
    case 'flying':
      return {
        backgroundColor: '#556dff',
        color: '#fff',
      }
    case 'poison':
      return {
        backgroundColor: '#88447a',
        color: '#fff',
      }
    case 'ground':
      return {
        backgroundColor: '#bf9926',
        color: '#fff',
      }
    case 'rock':
      return {
        backgroundColor: '#a59249',
        color: '#fff',
      }
    case 'bug':
      return {
        backgroundColor: '#83901a',
        color: '#fff',
      }
    case 'ghost':
      return {
        backgroundColor: '#5454b3',
        color: '#fff',
      }
    default:
      return '#fff'
  }
}