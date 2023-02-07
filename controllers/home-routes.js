const axios = require('axios');
const router = require('express').Router();
// const { User } = require('../models');


router.get('/', async (req, res) => {
  try {
    res.render('homepage', { 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// insert api call here !!! (header) 
//track id users sends you
//auth token user needs to give us in some degreee 
// otherwise we have to input auth token ourselves
router.get('/homepage', async (req, res) => {
  const response = await axios.get('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl',{
    //always need headers for spotify to work (content type and auth)
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer BQBXS6ecpNJqZAzg-zihQWbNwylS0cUfBhvy1R5vH7KSFEIDJviUU22UVcy44404Tqt1Nr8ng5BVWVLEm0FKg_GkwNs4FmbZ79Y0mwg7ICpW_iVkTJuQu32mtDpiz5fUBApUZrf0V0LzR9ApkB7adHxA_wHPcRMnd-9ddF0_RG-nlw'
      //need to make bearer dynamic for user
    }
  })
  // const data = await response.json();
  // console.log(response.data);
  // res.json(response.data);
  res.render('song', response.data);
});

// // for multiple songs
// router.get ('/songs', async (req, res) => {
//   const response = await axios.get('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl',{
//     //always need headers for spotify to work (content type and auth)
//     headers: {
//       'Content-type': 'application/json',
//       'Authorization': 'Bearer BQBXS6ecpNJqZAzg-zihQWbNwylS0cUfBhvy1R5vH7KSFEIDJviUU22UVcy44404Tqt1Nr8ng5BVWVLEm0FKg_GkwNs4FmbZ79Y0mwg7ICpW_iVkTJuQu32mtDpiz5fUBApUZrf0V0LzR9ApkB7adHxA_wHPcRMnd-9ddF0_RG-nlw'
//     }
//   })
//   res.render('song', response.data);
// });

module.exports = router;