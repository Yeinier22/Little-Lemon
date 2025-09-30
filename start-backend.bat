@echo off
REM Quick Backend Startup for Windows
REM Run this in a separate terminal to start the reservation API server

cd server
npm install
npm run dev

REM Alternative: from project root
REM npm run dev:api