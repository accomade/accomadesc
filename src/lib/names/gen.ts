import adjectives from './adjectives.json'
import plants from './plants.json'

const rndAdjective = () => {
  let i = Math.floor(Math.random() * adjectives.length)
  return adjectives[i]
}

const rndSpecies = () => {
  const plantsLength = plants.plants.length
  const i = Math.floor(Math.random() * plantsLength)
  const name = plants.plants[i].name
  return name.replace('-',' ').replace(/[^a-zA-Z|\s]/g, '') 
}

const capWord = (w:string) => {
  const [ firstLetter, ...rest ] = w
  return `${firstLetter.toLocaleUpperCase()}${rest.join("")}`.trim()
}

const rndName = ():string => {
  
  const adj = rndAdjective()
  const capAdj = capWord(adj)
  let result = capAdj
  
  const spe = rndSpecies()
  const splitted = spe.split(' ')
  splitted.forEach( (e) => {
    const trimmed = e.trim()
    if(trimmed.length > 0) {
      let cap = capWord(e)
      result = `${result} ${cap}`
    }
  })
  return result
}

const rndID = ():string => {
  const name = rndName()
  const lc = name.toLocaleLowerCase()
  return lc.replaceAll(/\s+/g, '-')
}


export const randomName = rndName
export const randomID = rndID