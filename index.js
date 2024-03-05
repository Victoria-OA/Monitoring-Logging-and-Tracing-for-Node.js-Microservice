const express = require('express');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { register, collectDefaultMetrics, Counter } = require('prom-client');

// Enable collection of default metrics like CPU and memory usage
collectDefaultMetrics();

// Create a tracer provider for OpenTelemetry
const provider = new NodeTracerProvider();

// Configure the Zipkin exporter for OpenTelemetry
const exporter = new ZipkinExporter({
  serviceName: 'my-nodejs-app', 
  url: 'http://localhost:9411/api/v2/spans', 
});

// Register the exporter with the provider
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

// Initialize the provider
provider.register();

// Create an Express app
const app = express();
const port = 3000;

// Define a custom metric
const customMetric = new Counter({
  name: 'my_custom_metric',
  help: 'This is a custom metric',
});

// Define a route for tracing
app.get('/', (req, res) => {
  // Increment the custom metric
  customMetric.inc();

  // Send a response
  res.send('Hello, World!');
});

// Define a route for Prometheus metrics
app.get('/metrics', async (req, res) => {
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

// Start the Express app
app.listen(port, '0.0.0.0', () => {
  console.log(`Microservice listening at http://localhost:${port}`);
});
