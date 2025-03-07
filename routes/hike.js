const uuid = require('node-uuid');
const axios = require('axios');

const API_GATEWAY_URL = process.env.API_GATEWAY_URL;

exports.index = async function(req, res) {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/hikes`);
    const hikes = response.data;
    console.log(JSON.stringify(hikes));
    res.render('hike', {title: 'My Hiking Log', hikes: hikes});
  } catch (err) {
    res.send(err);
  }
};

exports.add_hike = async function(req, res){
  const input = req.body.hike;
  const hike = { 
    HIKE_DATE: new Date(), 
    ID: uuid.v4(), 
    NAME: input.NAME,
    LOCATION: input.LOCATION, 
    DISTANCE: input.DISTANCE, 
    WEATHER: input.WEATHER
  };
  console.log('Request to log hike:' + JSON.stringify(hike));
  try {
    await axios.post(`${API_GATEWAY_URL}/hikes`, hike);
    res.redirect('/hikes');
  } catch (err) {
    res.send(err);
  }
};