import React from 'react';
import { useState, useEffect } from 'react';
import './index.css';
import axios from "axios";
import { json } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState("");
  const [res , setRes] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // 
    console.log(event);
    console.log(query)
    axios.get(`http://localhost:3001/Menu/${query}`)
    .then(data => 
      { setLoading(false);
       
        setRes(data);
      }).catch((error) => {
        setLoading(false);
        console.error(error);
        setError(error);}) // Handle and display the error  
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search food..."
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
       
      </form>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ):
        res === "" ?
        <>
        </>:
        <div>
          <MyComponent res={res} />
        </div>
      }
      <p>want to make it at home ? click to get recieps</p>
    </div>
)}

function MyComponent({ res }) {
  // Check if res is empty or undefined
  
  // Check if the required data properties (About and Menu) exist
  const data = JSON.parse(res.data)
  const [abt,setAbt] = useState("");
  const [rate,setRatings] = useState("");
  const [menu,setMenu] = useState("");
  const [dish,setdish] = useState("");
  const [loading, setLoading] = useState(false);

  const [recipt, setReceipt] = useState(null);
  const [error, setError] = useState("");
  const [dishNames, setDishNames] = useState('');
  
  const handleNameClick = (dishNames) => {
    //clickedName.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // 

    axios.get(`http://localhost:3001/receipt/${dishNames}`)
    .then(response => 
      { setLoading(false);
        const recommendedMessage = response.data.completion.choices[0].message.content;
        setReceipt(recommendedMessage);
      }).catch((error) => {
        setLoading(false);
        console.error(error);
        setError(error);})          
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here, you can use dishNames for generating the receipt
  };
  useEffect(() => {
		// Assuming you want to use this effect when Message changes
		if (recipt) {
		  // Check if Message.choices and Message.choices[0] exist
		  if (recipt.choices && recipt.choices.length > 0) {
			setReceipt(recipt);
		  } else {
			// Handle the case where Message doesn't have the expected structure
			setError("Invalid Message structure");
		  }
		}
	  }, [recipt]);
  
  useEffect(()=>{  setAbt(data.data.About.Name);
  },[res]);
  useEffect(()=>{  setRatings(data.data.About.Ratings);
  },[res]);
  useEffect(()=>{  setMenu(data.data.Menu[1].title);
  },[res]);
  useEffect(()=>{  setdish(data.data.Menu[1].Dishes);
  },[res]);
  
  // Render the data
  return (
    <div>
      <div>About: {JSON.stringify(abt)}</div>
      <div>Ratings: {JSON.stringify(rate)}</div>
      <div>Menu:{JSON.stringify(menu)}</div>
      <div>Menu:{JSON.stringify(dish.length)}</div>

    
      <div>Dishes:
      {dish !== "" ?  dish?.map(d=>(
        <div><ul>
     <button onClick={() => handleNameClick(d.name)}>{d.name}</button>
     </ul>
     
        <div>
          <myRecipes dishNames={d.name} />
        </div>
          </div>
      )):
      <>
      </>
      }
     </div>
     <li className="openai-message">
              recipt : {recipt}
            </li>
    </div>
     
    
  )
} 



export default SearchBar;
