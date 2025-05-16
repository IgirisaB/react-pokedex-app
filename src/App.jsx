import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Import the game icons
import HPLogo from './assets/HP.png'
import ATKLogo from './assets/ATK.png'
import DEFLogo from './assets/DEF.png'
import SPATKLogo from './assets/SpATK.png'  
import SPDEFLogo from './assets/SpDEF.png'
import SPDLogo from './assets/SPD.png'

import './App.css'

// Import types icons
import normalIcon from './assets/types/normal.png';
import fireIcon from './assets/types/fire.png';
import waterIcon from './assets/types/water.png';
import electricIcon from './assets/types/electric.png';
import grassIcon from './assets/types/grass.png';
import iceIcon from './assets/types/ice.png';
import fightingIcon from './assets/types/fighting.png';
import poisonIcon from './assets/types/poison.png';
import groundIcon from './assets/types/ground.png';
import flyingIcon from './assets/types/flying.png';
import psychicIcon from './assets/types/psychic.png';
import bugIcon from './assets/types/bug.png';
import rockIcon from './assets/types/rock.png';
import ghostIcon from './assets/types/ghost.png';
import dragonIcon from './assets/types/dragon.png';
import steelIcon from './assets/types/steel.png';
import darkIcon from './assets/types/dark.png';
import fairyIcon from './assets/types/fairy.png'; 
import stellarIcon from './assets/types/stellar.png'; 

function App() {
  const [count, setCount] = useState(1)
  const [data, setData] = useState(null)
  const [pokemon, setPokemon] = useState(null)
  const [searchId, setSearchId] = useState('');


  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${count}`;

    const fetchPokemon = () => {
      fetch(url)
      .then((response) => {
        if(!response.ok) {
          throw new Error(`This aint working b/c ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json.species.name);
        setPokemon(json);
      })
      .catch((error)=> {
        console.error(error.message);
      })
    }
    fetchPokemon();

  }, [count])

  // button functions
  const incrementCount = () => {
   setCount(prevCount => Math.min(prevCount + 1, 1025)); // Ensure count doesn't go above 1025
  };

  const decrementCount = () => {
    setCount(prevCount => Math.max(prevCount - 1, 1)); // Ensure count doesn't go below 1
  };

  const randomCount = () => {
    setCount(Math.floor(Math.random() * 1025) + 1); 
  };

  // search function
  // set the searchId to the input value
  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };
  
  const handleSearchSubmit = () => {
    const newCount = parseInt(searchId, 10);
    if (!isNaN(newCount) && newCount >= 1 && newCount <= 1025) {
        setCount(newCount);
    } else {
        alert("Please enter a valid Pokemon number. 1 - 1025.");
    }
  };

  // get Pokemon type icons
  //via switch case statements
  const getTypeIcon = (typeName) => {
    switch (typeName) {
      case 'normal': return normalIcon;
      case 'fire': return fireIcon;
      case 'water': return waterIcon;
      case 'electric': return electricIcon;
      case 'grass': return grassIcon;
      case 'ice': return iceIcon;
      case 'fighting': return fightingIcon;
      case 'poison': return poisonIcon;
      case 'ground': return groundIcon;
      case 'flying': return flyingIcon;
      case 'psychic': return psychicIcon;
      case 'bug': return bugIcon;
      case 'rock': return rockIcon;
      case 'ghost': return ghostIcon;
      case 'dragon': return dragonIcon;
      case 'steel': return steelIcon;
      case 'dark': return darkIcon;
      case 'fairy': return fairyIcon;
      case 'stellar': return stellarIcon;
      default: return null; // Or a default icon
    }
  };


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1>Vite + React</h1>

      <div>
    <input
        type="text"
        placeholder="Enter Pokemon number"
        value={searchId}
        onChange={handleSearchChange}
    />
    <button onClick={handleSearchSubmit}>Search</button>
</div>





      <div className="card">
         <button onClick={decrementCount}>
          Previous Pokemon
        </button>

        <button onClick={randomCount}>
          Random Pokemon
        </button>

         <button onClick={incrementCount}>
          Next Pokemon
        </button>

        







        <p>Pokemon number {count}</p>
     
        {/* 
        display the pokkemon data
        Use conditional to first load the data, then display
       */}
        {pokemon && (
          <div id = "pokemon-data">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <img src={pokemon.sprites.back_default} alt={pokemon.name} />
            
            
            {/* 
              Poekomn types
             */} 
            
            <div className='types'>
              {pokemon.types.map((typeSlot, index) => (
                <span key={index}>
                  <img src={getTypeIcon(typeSlot.type.name)} alt={typeSlot.type.name} className="type-icon" />
                  
                  {index < pokemon.types.length - 1 && " "}
                </span>
              ))}
            </div>

            {/* 
             Display the abilities line by line. Account for hidden abilities.
             If there is no 2nd ability, but a hidden ability, the second line has no output.
             */}  
            <div id = "abilities">
              {pokemon.abilities.map((abilitySlot) => (
                <div key={abilitySlot.slot}>
                    {abilitySlot.slot === 1 && <span>Ability 1: {abilitySlot.ability.name}</span>}
                    {abilitySlot.slot === 2 && <span>Ability 2: {abilitySlot.ability.name}</span>}
                    {abilitySlot.is_hidden && <span>Hidden Ability: {abilitySlot.ability.name}</span>}
                </div>
              ))}
            </div>
            
            


            <div id = "stats box">
              <h4>Base Stats</h4>
              <div className='HP'>
                <span className='stat-title'>HP</span>
                <img src={HPLogo} alt="HP-icon" className='stat-icon'/>   
                <span className='base-value'>{pokemon.stats[0].base_stat}</span>
              </div>
            
              <div className='ATK'>
                <span className='stat-title'>ATK</span>    
                <img src={ATKLogo} alt="ATK-icon" className='stat-icon'/>   
                <span className='base-value'>{pokemon.stats[1].base_stat}</span>
              </div>
            
              <div className='DEF'>
                <span className='stat-title'>DEF</span>    
                <img src={DEFLogo} alt="DEF-icon" className='stat-icon'/>   
                <span className='base-value'>{pokemon.stats[2].base_stat}</span>
              </div>

              <div className='SpATK'>
                <span className='stat-title'>SpATK</span>    
                <img src={SPATKLogo} alt="SpATK-icon" className='stat-icon'/>   
                <span className='base-value'>{pokemon.stats[3].base_stat}</span>
              </div>

              <div className='SpDEF'>
                <span className='stat-title'>SpDEF</span>    
                <img src={SPDEFLogo} alt="SpDEF-icon" className='stat-icon'/>   
                <span className='base-value'>{pokemon.stats[4].base_stat}</span>
              </div>

              <div className='SPD'>
                <span className='stat-title'>SPD</span>    
                <img src={SPDLogo} alt="SPD-icon" className='stat-icon'/>   
                <span className='base-value'>{pokemon.stats[5].base_stat}</span>
              </div>

              
            
            </div>

            {/* 
             API does not have evolution data. Sad
             */} 
            
            
            
          











          </div>
        )}
       
        



        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App