const fs = require('fs');
const path = require('path');

// Path to the JSON file
const toursFilePath = path.join(__dirname, '../dev-data/data/tours-simple.json');

// Read and parse the JSON file
let tours = JSON.parse(fs.readFileSync(toursFilePath));

// Middleware to add request time
exports.addRequestTime = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

// Get all tours
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours }
  });
};

// Get single tour by ID
exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
};

// Create a new tour
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(toursFilePath, JSON.stringify(tours), err => {
    if (err) {
      return res.status(500).json({ status: 'fail', message: 'Could not save tour' });
    }
    res.status(201).json({
      status: 'success',
      data: { tour: newTour }
    });
  });
};

// Update an existing tour
exports.updateTour = (req, res) => {
  const id = Number(req.params.id);
  const tourIndex = tours.findIndex(el => el.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  // Update the tour
  tours[tourIndex] = { ...tours[tourIndex], ...req.body };

  fs.writeFile(toursFilePath, JSON.stringify(tours), err => {
    if (err) {
      return res.status(500).json({ status: 'fail', message: 'Could not update tour' });
    }
    res.status(200).json({
      status: 'success',
      data: { tour: tours[tourIndex] }
    });
  });
};

// Delete a tour
exports.deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const tourIndex = tours.findIndex(el => el.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  tours.splice(tourIndex, 1);

  fs.writeFile(toursFilePath, JSON.stringify(tours), err => {
    if (err) {
      return res.status(500).json({ status: 'fail', message: 'Could not delete tour' });
    }
    res.status(204).json({ status: 'success', data: null });
  });
};