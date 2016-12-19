#Random user API

This is just a noddy service for connecting to a MongoDB and fetching mock data for random users so that the information can be used in development for other services.

- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

##Documentation

The following are the available API's which can be called once the server is up and running...

###/health-check
- Let's you know if a connection to the database is available and that the server is running correctly.

###/add-user
- Presents you with a simple form allowing you to enter a name.

###/get-users
- Retrieves all users from the database.

###/get-user
- Presents you with a simple form allowing you to enter a name and search the database for matches.

##Contributions

If you feel that you could help this project, then please feel free to put in a PR.

##Contact

Feel free to contact me with suggestions/ideas/bugs or as above, simply publish a PR.

- [@lmcjt](https://twitter.com/lmcjt)
- [lmcjt.com](http://lmcjt.com)

##Pipeline
- Update users
- Delete users
- Retrieve users via query
- Add users via query
- Validation before POSTs
- Parse ID's from returned JSON
- Present returned information in a more presentable way (i.e. table)
- Style interface
