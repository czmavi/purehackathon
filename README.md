# purehackathon

Unfinished Pure Hackathon project. My goal was to create video loop running on Raspberry Pi that could be managed remotely.

## Installation

Raspberry: You need to install https://github.com/adafruit/pi_video_looper and set it to use directory instead of flash drive. Then copy `server.py` to Raspberry and update the urls inside to match the server url. Also you need to update device id to something that is in your DB.
Server and frontend installation is pretty straightforward you just need to do `yarn` in the frontend and `npm install` for the server (I was using parts of my older projects hence the different package managers).
For the DB you just need to populate Mongodb to have some data that would match the data sctructure in the `/common/models` folder.

## What is missing

The project is incomplete, there is no gui setup when initializing with an empty DB, the authorization is not completed, there are no user passwords etc.
