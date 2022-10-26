# ReminderBulb

Reminder Bulb is an application for creating _TO-DO_ tasks.  
This is a sample project using the MEAN stack. It can server as a schematics for scaffolding other type of applications that require the same techstach and similar functionalities.

## Tech Stack:

- Angular
- NodeJS
- Typescript
- Express
- MongoDB
- AWS EB
- Git

## Development Server

Run `npm run start:server:dev` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Configuration

The server connects to MongoDb to persist data. In order to run the application correctly, ensure you have your MongoDb environment working and the connection URL for the same. This should be added to [server/server.config.js **_line 11_**](https://github.com/delamazagj/reminder-bulb/blob/ddfcf2229f4f5bbdbae0de5342128d0edcfa849a/server/server.config.js#L11), replacing the current assignment for the variable DB_URL with your own DB URL for conecting to MongoDB

## Sample Deployment

The sample for this app is hosted in AWS EB and can be accessed [here](http://reminderbulb-env.eba-wbjzbauz.us-east-1.elasticbeanstalk.com/)

## Future Enhancements

- Pagination
- Authentication
- Authorization
- Quick Search

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
