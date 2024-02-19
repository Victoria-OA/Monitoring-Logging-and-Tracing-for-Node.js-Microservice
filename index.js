const express = require('express');
const { register, collectDefaultMetrics, Counter } = require('prom-client');

// Enable collection of default metrics like CPU and memory usage
collectDefaultMetrics();

const app = express();
const port = 3000;

// Define a custom metric
const customMetric = new Counter({
  name: 'my_custom_metric',
  help: 'This is a custom metric',
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/metrics', async (req, res) => {
  // Increment the custom metric on each request
  customMetric.inc();

  try {
    // Get the metrics string (await if register.metrics() returns a Promise)
    const metrics = await register.metrics();

    // Return the metrics for scraping by Prometheus
    res.set('Content-Type', register.contentType);
    res.end(metrics);
  } catch (err) {
    console.error('Error generating metrics:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Microservice listening at http://localhost:${port}`);
});
