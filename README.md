# A simple minimilistic Real-Time Messaging App (WhatsApp-like)

A simple, real-time messaging app built with **Node.js**, **Prisma**, **PostgreSQL**, and **Socket.IO**. This app allows users to search for other users and start private messaging in real-time.

## Features

- Real-time private messaging using **Socket.IO**
- User search functionality
- Simple, intuitive messaging interface
- Built with **Node.js**, **PostgreSQL**, and **Prisma**
- **PNPM** for package management

## Technologies Used

- **Node.js** - Server-side JavaScript
- **Prisma** - ORM for interacting with PostgreSQL
- **PostgreSQL** - Database for storing user and message data
- **Socket.IO** - Real-time bidirectional event-based communication
- **PNPM** - Fast and efficient package manager

## Prerequisites

Before setting up the app locally, ensure you have the following installed:

1. **Node.js** (version 14 or higher) - [Download Node.js](https://nodejs.org/en/download/)
2. **PNPM** (package manager) - [Install PNPM](https://pnpm.io/installation)
3. **PostgreSQL** - [Install PostgreSQL](https://www.postgresql.org/download/)

## Setup Instructions

Follow these steps to set up the app locally on your machine:

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/holasoymas/whatsapp.git
cd whatsapp
```

### 2. Install dependencies

Go to your root directory and type

```bash
pnpm install
```

to install dependencies

### 3. Set up PostgreSQL database

Make sure your PostgreSQL server is running. You can use the default credentials or create your own.

Create a new database

```bash
psql -U postgres
CREATE DATABASE whatsapp;
```

- Create a `.env` file in the root of the project to store environment variables. Add the following line to configure the database connection along with other env variables

```
PORT=8000
JWT=YOUR_SECRET_TOKEN
EMAIL=your@examplegmail.com
GOOGLE_PASS="GOOGLE_PASS_KEYS_FOR_SENDING_EMAIL"
DB_NAME=YOUR_DB_NAME
DB_USER=YOUR_DB_USERNAME
DB_PASS=YOUR_DB_PASS
SECRET_SESSION=YOUR_SECRET_SESSION

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://<user-name>:<user-password>@localhost:5432/whatsapp?schema=public"
```

### 4. Run Prisma migrations

Run Prisma to generate the necessary tables and schema in the database:

```bash
pnpm prisma migrate dev
```
