# Flagosia

A primitive Feature Flagging app

## API

A Go API that provides a CRUD interface for flags

```
GET     /flags      get all flags (admin UI)
POST    /flags      create flag (admin UI)
PUT     /flags      update flag (admin UI)
DELETE  /flags      delete flag (admin UI)

GET     /check-flags get all flags (public)
```

Uses SQLite and drops ALL tables on startup.

I used `gow run .` to run it on `http://localhost:8080` to run it and auto-recompile.

## Admin Client

A react app that serves as the admin UI to CRUD flags.

`yarn` to install `yarn dev` to run on `http://localhost:3000`

## Example App

A nextjs app that demonstrates the functionality. Makes a call to `http://localhost:8080/check-flags` to retrieve flags and then shows/hides features in the UI. Also does some Geolocation magic to send some client info to the flagging API (does not work locally - will always default to some US location).

`yarn` to install `yarn dev` to run on `http://localhost:3001`

![Screenshot 2022-07-08 at 14 52 39](https://user-images.githubusercontent.com/9072277/177996021-8e63108a-ddbd-4f4d-be0e-a2669834a9f5.png)
