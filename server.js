const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

const user = {
  name: 'William',
  hobbies: [
    'climb',
    'code',
    'eat'
  ]
}

const randomThing = (array) => {
  const choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`
  console.log(log);

  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Could not write to file');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMsg: `Welcome, ${user.name}!`,
    about: `Did you ${randomThing(user.hobbies)} today?`
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.listen(3000, () => console.log('Server is running on port 3000'));