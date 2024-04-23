# AI Quote Request Widget

## Overview

The AI Quote Request Widget is a Node.js application built with NestJS on the server-side and ReactJS with Redux on the client-side. It serves as a widget that automates the process of turning customer emailed requests for quotes (RFQ) into quotes.

### Technologies Used

- Node.js
- NestJS
- ReactJS
- Redux
- PostgreSQL database

## Setup

### Database

The application uses a PostgreSQL database, which is set up within a Docker container. Make sure Docker is installed and running, then execute the following command to start the PostgreSQL container:

$ docker run --name notification -p 5432:5432 -e POSTGRES_PASSWORD=your_password_here -d postgres

### Server and Client

Before running the application, you need to install the Node modules. Run the following command three times, once in the /client directory and twice in the /server directory:

$ npm install

Before starting the application, configure the Node.js server environment variables in the server/.env file. Here's an example of the .env file:

* POSTGRES_HOST=localhost
* POSTGRES_PORT=5432
* POSTGRES_USER=postgres
* POSTGRES_PASSWORD=your_password_here
* POSTGRES_DATABASE=your_db_name
* GPT_KEY=chat_gpt_secret_key

## Usage

To use the application, follow these steps:

1. Set the email and email context and press the "Send Quote" button.
2. After the request is complete, you will receive quote information.
3. Customer emails must be registered in the system. Use product words from the provided dummy data in the email context.

## Default Data

When the Node server starts, default data for customers, products, and inventories is created. Here's the default data:

### Customers

- John Doe: john@example.com
- Jane Smith: jane@example.com

### Products

| id | name                   | description                                                          | unit_price | deliver_time |
|----|------------------------|----------------------------------------------------------------------|------------|--------------|
| 1  | Steel Rods             | High-quality steel rods for construction purposes.                   | 39.99      | 3            |
| 2  | Aluminum Sheets        | Lightweight aluminum sheets suitable for various applications.       | 59.99      | 5            |
| 3  | Copper Wire            | Premium-grade copper wire for electrical wiring.                     | 29.99      | 2            |
| 4  | Brass Fittings         | Durable brass fittings for connecting pipes in plumbing systems.     | 19.99      | 2            |
| 5  | Titanium Bars          | High-strength titanium bars suitable for aerospace and medical applications. | 99.99 | 7            |
| 6  | Nickel Alloys          | Versatile nickel alloys used in chemical processing, electronics, and aerospace industries. | 79.99 | 6            |
| 7  | Iron Castings          | Precision iron castings for machinery and automotive parts.         | 29.99      | 3            |
| 8  | Lead Sheets            | Heavy-duty lead sheets for radiation shielding and construction.     | 69.99      | 5            |
| 9  | Zinc Coils             | Galvanized zinc coils for corrosion protection in construction and automotive industries. | 39.99 | 4            |
| 10 | Tungsten Carbide Tools | Hard-wearing tungsten carbide tools for cutting, drilling, and machining operations. | 89.99 | 7            |

### Inventory

| id | quantity_available | cost_per_unit | deliver_time | productId |
|----|--------------------|---------------|--------------|-----------|
| 1  | 100                | 25.99         | 3            | 1         |
| 2  | 50                 | 35.99         | 5            | 2         |
| 3  | 150                | 19.99         | 2            | 3         |
| 4  | 80                 | 12.99         | 2            | 4         |
| 5  | 30                 | 69.99         | 7            | 5         |
| 6  | 60                 | 49.99         | 6            | 6         |
| 7  | 120                | 18.99         | 3            | 7         |
| 8  | 20                 | 45.99         | 5            | 8         |
| 9  | 90                 | 29.99         | 4            | 9         |
| 10 | 40                 | 59.99         | 7            | 10        |
