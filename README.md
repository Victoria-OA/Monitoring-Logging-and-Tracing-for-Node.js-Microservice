# Monitoring, Logging, and Tracing for Node.js Microservice

#### This repository contains a setup for monitoring, logging, and tracing a Node.js microservice using Prometheus, Grafana, Loki, and Zipkin. The setup includes Docker containers for each component and a Docker Compose file to orchestrate them.

## Components
### nodejs-app

    Description: The Node.js microservice.
    Port: 3000
    Usage: Serves as the main application for monitoring, logging, and tracing.

### cadvisor

    Description: Collects, aggregates, processes, and exports information about running containers.
    Port: 8080
    Usage: Provides container-level metrics for monitoring.

### prometheus

    Description: Collects metrics from monitored targets by scraping metrics HTTP endpoints.
    Port: 9090
    Usage: Stores and queries metrics data.

### grafana

    Description: Visualizes and analyzes metrics from Prometheus.
    Port: 3000
    Usage: Provides a web-based dashboard for monitoring metrics.

### node_exporter

    Description: Exports system metrics from the host machine.
    Port: 9100
    Usage: Collects metrics about the host machine.

### loki

    Description: Collects, indexes, and queries logs.
    Port: 3100
    Usage: Provides log aggregation and querying capabilities.

### promtail

    Description: Agents to tail logs and send them to Loki.
    Port: Not exposed
    Usage: Collects logs from containers and sends them to Loki.

### zipkin

    Description: Distributed tracing system.
    Port: 9411
    Usage: Collects, traces, and samples traces from the microservices.

### Usage

    Clone this repository.
    Run docker-compose up to start all the services.
    Access the services:
        Node.js microservice: http://localhost:3000
        Prometheus: http://localhost:9090
        Grafana: http://localhost:3000 (username: admin, password: admin)
        Zipkin: http://localhost:9411

### Configuration

    Prometheus configuration: ./prometheus.yaml
    Grafana datasources configuration: ./datasources.yaml
    Loki configuration: ./local-config.yaml
    Promtail configuration: ./promtail-config.yaml


