# Upbase

**Upbase** is a web app for inventory tracking.

Created for Shopify Backend Developer Intern Challenge 2022 ([link to task description](https://docs.google.com/document/d/1z9LZ_kZBUbg-O2MhZVVSqTmvDko5IJWHtuFmIu_Xg1A/edit)).

## Implemented user stories

- User can view a list of all items (with a number of placeholder items available).
- User can create new items with the basic information: name, price, stock.
- User can edit items.
- User can delete items.

## Frameworks and libraries

NodeJS (Express), MongoDB, and Bootstrap (for minor UI).

## Demo video

https://user-images.githubusercontent.com/29029881/150002479-67c25646-31b2-425a-a738-1929b55fcaa2.mp4

## Hosted page

The project is deployed using Heroku and is available at https://upbase-upbase.herokuapp.com/.

## Run locally

### Install NodeJS

Install the recommended file from https://nodejs.org/en/.

Verify installation:

```shell
$ node --version
>> v16.13.2
```

### Install MongoDB Community Edition
#### MacOS
Installation guides: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

#### Windows
Installation guides: https://zarkom.net/blogs/how-to-install-mongodb-for-development-in-windows-3328

### Run the app localy
Clone the project repository and navigate to the folder:
```shell
$ git clone https://github.com/nhungoc1508/Upbase.git
$ cd Upbase
```

Install all dependencies:
```shell
$ npm install
```

Run the app:
```shell
$ node app.js
```

The app will run on http://localhost:3000/.

## References and credits

Favicon: <a href="https://iconscout.com/icons/shopping" target="_blank">Shopping Icon</a> by <a href="https://iconscout.com/contributors/chamedesign" target="_blank">Chamestudio</a>
