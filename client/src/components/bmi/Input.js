
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import './Input.css'


function BmiCalculator() {
	const [heightValue, setHeightValue] = useState('');
	const [weightValue, setWeightValue] = useState('');
	const [bmiValue, setBmiValue] = useState('');
	const [bmiMessage, setBmiMessage] = useState('[]');
    const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [Message, setMessage] = useState('{}');

	
	const calculateBmi = () => {
		if (heightValue && weightValue) {
			const heightInMeters = heightValue / 100;
			const bmi = (weightValue / (heightInMeters * heightInMeters)).toFixed(2);
			setBmiValue(bmi);
			console.log(bmi);
			axios.get(`http://localhost:3001/BMI/${bmi}`)
			.then(response => 
			  { 
				console.log(response.data);
				setBmiMessage(response.data);
			  }).catch((error) => {	
				console.error(error);
				setError(error);}) // Handle and display the error  
			
		} else {
			setBmiValue('');
			setBmiMessage('[]');
		}
	};
	const handleWeightClick = (Message) => {
		setLoading(true); // 
	    console.log(Message);
		axios.get(`http://localhost:3001/Healthy/${Message}`)
		.then(response => 
		  { setLoading(false);
			console.log(response.data);
			const recommendedMessage = response.data.completion.choices[0].message.content;
            setMessage(recommendedMessage);
		  }).catch((error) => {
			setLoading(false);
			console.error(error);
			setError(error);})          
	  }
	  useEffect(() => {
		// Assuming you want to use this effect when Message changes
		if (Message) {
		  // Check if Message.choices and Message.choices[0] exist
		  if (Message.choices && Message.choices.length > 0) {
			setMessage(Message);
		  } else {
			// Handle the case where Message doesn't have the expected structure
			setError("Invalid Message structure");
		  }
		}
	  }, [Message]);
	 
	return (
		<div className="container">
         <h1>Let's keep fit</h1>
			<div className="input-container">
				<label htmlFor="height">Enter Your Height (cm):</label>
				<input
					type="number"
					id="height"
					value={heightValue}
					onChange={(e) => setHeightValue(e.target.value)}
				/>
			</div>
			<div className="input-container">
				<label htmlFor="weight">Enter Your Weight (kg):</label>
				<input
					type="number"
					id="weight"
					value={weightValue}
					onChange={(e) => setWeightValue(e.target.value)}
				/>
			</div>
			<button className="calculate-btn" onClick={calculateBmi}>
				Click to Calculate BMI
			</button>
			{bmiValue && bmiMessage&& (
				<div className="result">
					<p>
						Your BMI: <span className="bmi-value">{bmiValue}</span>
					</p>
					<p>
                   Result:
                 </p>
				 <ul>
            <li className="bmi-message">
              BMI: {bmiMessage.bmi}
            </li>
			<p>Click the button to see the recommended receipt according to ur Bmi</p>
			<button className="weight-category-button" onClick={() => handleWeightClick(bmiMessage.weightCategory)}>
                Weight Category: {bmiMessage.weightCategory}
              </button>
          </ul>
		  <li className="openai-message">
              recommended meal plan : {Message}
            </li>
				</div>
				

			)}   
      
		</div>
	);
}


export default BmiCalculator;
