@echo off

start cmd /k "cd gateway && npm run dev"
start cmd /k "cd user && npm run dev"
start cmd /k "cd hotel && npm run dev"
REM start cmd /k "cd booking && npm run dev"