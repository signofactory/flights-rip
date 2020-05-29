
# A simple Skyscanner clone built with React and Next.js

[Live demo](https://www.flights.rip)

  

## What is this and who is it for ⁉️

  

We build websites using web technologies, this is a showcase product we've built in our spare time. The goal is to improve by getting feedback from the community, while providing an example of modern, realistic (albeit simplified) React codebase.

  

This codebase offers valuable insights to React developers of all skill levels while (we hope!) still being relatively easy to understand.

  
  

## Features 🌟

  

- Frontend built on [Next.js](https://nextjs.org/), bootsrtapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app)

- Backend build using [Express.js](https://expressjs.com/) and [Mongoose](https://mongoosejs.com/)

- Authentication provided by [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2), implemented through the handy-dandy [Passport.js](http://www.passportjs.org/). Everything is cookie-based so that no token needs to be handled explicitly by the frontend

- UI based on [ant-design](https://ant.design/)

- Styling of components done through [styled-components](https://styled-components.com/)

- API calls to through Skyscanner's RapidAPI endpoint through [axios](https://github.com/axios/axios)

- Simple local state management through [Recoil](https://github.com/facebookexperimental/Recoil), without redux, mobx or similar

- Some images are form the amazing and trustworthy [Unsplash](https://www.unsplash.com)

- Written entirely in JavaScript (no TypeScript)

  
  

## Setting up the development environment ⚙️

  

- Install [MongoDB](https://www.mongodb.com/) on your local machine. We suggest [using Brew to do so](https://github.com/mongodb/homebrew-brew), if you are on MacOS
- Rename the .env.sample files in the `/frontend` and `/backend` directories in .env
- Customize the empty variables in the environment file:
	- You can get GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET variables by [following the instructions on Google website](https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials)
	- You can get a NEXT_PUBLIC_FLIGHTSCANNER_API variable by signing up on [RapidAPI](https://rapidapi.com/)

## Running the server locally 🏃🏽‍♀️
You can run both the frontend and the backend server from the root directory.
First, install the dependencies:
```bash

npm install

# or

yarn install

```
Then, run both servers using:  

```bash

npm run dev

# or

yarn dev

```

  

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Backend server will be running on [http://localhost:5000/api](http://localhost:5000/api)

 
 ## What we should probably do 📝
 This is a simple backlog of nice-to-haves that we might or might not implement in the future:
 

 - [ ] Move skyscanner APIs call from frontend to backend, to make sure public key cannot be hijacked in any way

  

## Author: Signofactory ✍️

  

-  [Website](https://www.signofactory.it)

- Feel free to shoot us an email at [authorname][at]gmail[dot]com

  
  

## License

  

[MIT](https://opensource.org/licenses/MIT)
