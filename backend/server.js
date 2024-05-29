const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const Company = require('./models/Company');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/webscraper', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const name = $('meta[property="og:site_name"]').attr('content') || $('title').text();
    const description = $('meta[name="description"]').attr('content');
    const logo = $('link[rel="icon"]').attr('href');
    const facebook = $('a[href*="facebook.com"]').attr('href');
    const linkedin = $('a[href*="linkedin.com"]').attr('href');
    const twitter = $('a[href*="twitter.com"]').attr('href');
    const instagram = $('a[href*="instagram.com"]').attr('href');
    const address = $('[itemprop="address"]').text();
    const phone = $('[itemprop="telephone"]').text();
    const email = $('[itemprop="email"]').text();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({ encoding: 'base64' });
    await browser.close();

    const company = new Company({ name, description, logo, facebook, linkedin, twitter, instagram, address, phone, email, screenshot });
    await company.save();

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

app.get('/companies', async (req, res) => {
  const companies = await Company.find();
  res.status(200).json(companies);
});

app.delete('/companies', async (req, res) => {
  const { ids } = req.body;
  await Company.deleteMany({ _id: { $in: ids } });
  res.status(200).json({ message: 'Companies deleted' });
});

app.get('/companies/:id', async (req, res) => {
  const company = await Company.findById(req.params.id);
  res.status(200).json(company);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
