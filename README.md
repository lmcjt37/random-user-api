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

###/get-user
- Presents you with a simple form allowing you to search the database for matches on either firstName, lastName or UID. If you search without any data it will fetch all entries in the database.

###/update-user
- Presents you with a simple form allowing you to find a matching UID from the database (Use /get-users to fetch a list of current users in the database for the uid). Then update the firstName and lastName with new values for that uid.

###/delete-user
- Presents you with a simple form allowing you to delete a matching UID from the database (Use /get-users to fetch a list of current users in the database).

##Contributions

If you feel that you could help this project, then please feel free to put in a PR.

##Contact

Feel free to contact me with suggestions/ideas/bugs or as above, simply publish a PR.

- [@lmcjt](https://twitter.com/lmcjt)
- [lmcjt.com](http://lmcjt.com)

##Pipeline
- Retrieve users via query
- Add users via query
- Validation before POSTs
- Parse ID's from returned JSON
- Present returned information in a more presentable way (i.e. table)
- Style interface
