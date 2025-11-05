const express = require('express'); 
const app = express(); 
const PORT = 8010; 

app.use(express.json()) 

let samochodyWladka =[{"id":1,"nazwa":"Subaru"}, 
{"id":2,"nazwa":"BMW"}, 
{"id":3,"nazwa":"Volkswagen"}, 
{"id":4,"nazwa":"Ford"}, 
{"id":5,"nazwa":"Mazda"}, 
{"id":6,"nazwa":"Volvo"}, 
{"id":7,"nazwa":"Mercedes-Benz"}, 
{"id":8,"nazwa":"Buick"}, 
{"id":9,"nazwa":"Pontiac"}, 
{"id":10,"nazwa":"Suzuki"}] 



InputDeviceInfo [id="", nazwa=""] 
Add in samochodyWladka 
app.listen(PORT, (error)=>{ 
if(!error){ 
    console.log("Serwer działa na porcie: "+PORT) }else{ 
    console.log("Port nie działa: ", error) } } )