# LoginApp

After cloning the repo please perform below steps:
### Create Database
* Using MySql database for storing the data.
* Run commands written in `/db/dbinit.sql`
* It will create "liimex" database and "Users" table.

### Run backend API
* Goto /api/ folder
* run `npm install` to install all required packages
* Please mention your MySQL database username and password in `config/dbconnections.js` file for connecting with db.
* you can run development server using `node server.js` or I use `nodemon server.js` for live reloading of changes.
* It will run api at `http://localhost:4000/api`.
* Incase your port 4000, is occupied then change the port in `server.js` => `app.listen(4000);`
* Also change Backend port in Frontend app `/app/Config.js`

### Run Frontend app
* Goto /app folder
* run `npm install` to install all required packages
* run `npm start` to start the application
* it'll run on port `http://localhost:3000/`

### Other useful information
* For random images I am using unsplash.com Developers API.
* Images are downloaded and saved in `public/images` folder.
* The application is only using a `Users` table.
* Images relative path is saved in Users table=> url field.

### Troubleshooting
* If registration process takes time, please check external dependency url: https://api.unsplash.com/photos/random?client_id=1c57555bb86f74273d646892417377cc8f4d0043ab84ddc7e4d3de46f7daf0e5
* Check database connection.



