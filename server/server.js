// import OpenAI from "openai";

const express =require ('express');
const app=express();
const cors = require('cors');
const apiKey = '';
const openai_ = require('openai');
const openai = new openai_.OpenAI({apiKey: apiKey});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json())

app.get('/Menu/:name', async function (req, res){
const {name} = req.params;
  try {
    const { query } = req.body;
    // Use the search results to make requests to the external API
    // For each search result, fetch data from the external API
    console.log(name);
    const url=(`https://foodiefetch.p.rapidapi.com/swiggy?query=${name}`);
      const options = {
              method: 'GET',
              headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'foodiefetch.p.rapidapi.com'
              }
            };
      
        const response =await fetch(url, options);
        const result = await response.text();
        console.log(result);

        res.json(result);
       
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
  });


  app.get('/receipt/:dishNames', async function (req, res){
    const {dishNames} = req.params;
    console.log(dishNames);
    const messages = [
      {
        role: 'system',
        content: 'You are a system message',
      },
      {
        role: 'user',
        content: `generate the way to make  ${dishNames}`,
      },
    ];
    console.log(messages);
    console.log(openai.apiKey); // Check if the API key is set

    
      // if (!Array.isArray(dishNames) || dishNames.some((item) => typeof item !== 'string')) {
      //   return res.status(400).json({ error: 'Invalid input. dishNames should be an array of strings.' });
      // }
      
      // Generate a receipt using the OpenAI API
      const completion = await openai.chat.completions.create({
        messages : messages,
        model: "gpt-3.5-turbo",
      });
      //completion.choices[0];
        res.json({ completion });
        console.log(completion.choices[0]);

  });
  
  app.get('/BMI/:result', async function (req, res){
    const {result} = req.params;
    console.log(result);
   
        // Use the search results to make requests to the external API
        // For each search result, fetch data from the external API
        const url = `https://body-mass-index-bmi-calculator.p.rapidapi.com/weight-category?bmi=${result}`;
        const options = {
          method: 'GET',
         // url: `https://body-mass-index-bmi-calculator.p.rapidapi.com/weight-category`,
         // params: {bmi: 'result'},
         method: 'GET',
	       headers: {
		'X-RapidAPI-Key': '',
		'X-RapidAPI-Host': 'body-mass-index-bmi-calculator.p.rapidapi.com'
	}
        }; 
        try{
        
            const response =await fetch(url, options);
            if (!response.ok) {
              throw new Error('API request failed');
            }
            const responseData=await response.json();
            console.log(responseData);
            res.json(responseData);    
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
      });  

      app.get('/Healthy/:message', async function (req,res){
        const {message} = req.params;
        console.log(message);
        const messages = [`generate a receipt for ${message}`];
        const content = [
          {
            role: 'system',
            content: 'You are a system message',
          },
          {
            role: 'user',
            content: `generate the a food plan for  ${message}`,
          },
        ];
        console.log(messages);
        
        console.log(openai.apiKey); // Check if the API key is set
    
      
            // Generate a receipt using the OpenAI API
            const completion = await openai.chat.completions.create({
              messages:content,
              model: "gpt-3.5-turbo",
            });
            res.json({ completion});
            console.log(completion.choices[0]);
        
        });
app.listen(3001,()=>{
    console.log("server started on port")
})