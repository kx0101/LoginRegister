# User Registration & Login systems in Node.js with NO DB

## Getting Started

The project is [live](https://registerloginsxoli.herokuapp.com/login) on: 🌍 https://registerloginsxoli.herokuapp.com/login 

- ## Home Page

If the user has been registered on the app, can login by passing the credentials.

<img src="screenshots/homePage.png">

- ## Register

Allows the user to register their account by filling their Email, Username, Password.

<img src="screenshots/registerTab.png">

- ## No user with that email

Error message when trying to log in using an unregistered email.

<img src="screenshots/errorMessage1.png">

- ## Wrong Password

Error message when trying to log in with the incorrect password.

<img src="screenshots/errorMessage2_1.png">

- ## Hashed Password

We're using a bcrypt to hash the passwords.

<img src="screenshots/hashedPassword.png">

## Installing

```
npm install
```

## How To Run The App

```
node app.js
```

###### The server will start running on
- [localhost:5000](http://localhost:5000)
