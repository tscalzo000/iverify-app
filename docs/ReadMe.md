# iVerify Full Stack Home Test

## Description
A full stack application created for iVerify's Full Stack Home Test.

## Languages and Frameworks Used
- **Python**: The primary programming language used for the project.
- **Flask**: A micro web framework for Python that is lightweight and easy to use.
- **React**: The frontend Javascript framework used for the frontend.
- **SQLAlchemy**: The ORM used to access the database from Python.
- **PostgreSQL**: The storage solution for databases.
- **Docker**: Containerizes the project for easy use by others.

## Instructions for Use
**Prerequisites**: Docker/Docker Desktop

1. Clone repository and navigate to it in your terminal
2. Run `docker compose build`, which will build the three containers required for the project (frontend, backend, db)
3. When finished building, run `docker compose up db -d`, which will launch the database container
4. In Docker Desktop, open the db container (usually has a name like 'iverify-app-db-1'), go to the `Exec` tab and run the commands `su - postgres`, `psql` to enter postgres psql
5. Run the command `\c app_dev` to connect to the app_dev database
6. Using the database creation scripts in the [DB Creation](db_creation.md) to create the tables
7. Insert your dummy data for users, devices, and scans (examples are in the [DB Seed](db_seed.md) file)
8. Back in your terminal, run `docker compose up` which will launch the other containers
9. Once the containers are fully loaded, navigate to http://localhost:3000/
10. Register using whatever name and email you want
11. Once registered, sign into the site using those credentials and you'll be able to see the users, devices, and scans

## API Documentation
API documentation can be found in [API Docs](api_docs.md)

## Future Improvements
Next steps for this project would be:
- Dashboard for an individual user which shows their person devices and scans
- Create an accordion view so that rather than loading all devices and scans at once, a button would show on each row of the user list which would allow fetching devices for that specific user and display under the current row in an accordion format, and for each device listed in that view, have another button to display scans for that specific device.
- Material UI's table is great at sorting and finding by a specific field, but once the count of users, devices, and scans increase past a certain point, lazy loading would be preferable and a more direct search functionality prior to loading would be helpful
- If the functionality becomes more complex (such as adding the ability to add users, devices, or scans manually or programmatically), adding in something like Swagger to automatically generate documentation and allow for API testing would be necessary
