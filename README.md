# A simple minimilistic whatsapp like app

## Middleware

Middleware is a function in an Express application that processes incoming requests and outgoing responses.
Middleware functions have access to the `req` (request) and `res` (response) objects and the `next()` function,
which determines whether the next middleware should run.

Purpose

- Middleware acts as a processing pipeline where requests pass through one or more middleware functions before reaching the route handler or returning a response
- Modify `req` or `res`
- Execute logic (eg, validation, logging, authentication)
- Stop further processing and return a response.
- Pass the control to the next middleware using `next()`.
