# Getting Started with server

# Project prerequisites

formik
Polaris shopify
Apoloclient
Graphql
Yup
Sequlize

# To start, the server must be running. According to the README file, we start by installing the yarn manager package and do all the steps. Before doing anything, you must install nvm on your system so that you can switch to different versions of node.

Because the server is running with node 16, and every time to run the server, you have to run the nvm use 16 command and then the yarn start command.
1- You clone the server from the following link on your system

# 2- https://github.com/rahkar-education/graphql-server-karjoo.git

3- In the main root of the cloned project, create a file with the extension .env
4- Put the following information in the file.

# NODE_ENV=

# API_SECRET_TOKEN=uMZNgUVnGESz8ZSsrWRKzEb$EsS52U

# PORT=4000

1- Instead of the red part, we get a new token from https://keygen.io/ and replace it.
2- We run yarn start in the terminal of the server project
3- Run yarn nodemon
4- You install and run the WAMP server in your system https://www.wampserver.com/en/
5- You install the mysql database in your system, just note that the password you give to the system when installing and running musql must match the development part in the config.json file of the server project.
6- yarn run sequelize db:migrate You run this command in the server project.
7- From now on, the server project will only run with the yarn start command and it will give you a url (http://localhost:4000/graphql) in the terminal, which you can run in a browser (playground).
8- You can run queries and mutations in the playground. To test the server, it is better to run a query in the playground.
9- After completing these steps, change the node version with nvm to the version you want to write the project with and create a react project. Building a reactjs project
1- First you create a react project Using the react-router-dom package, you write project routes in the APP file. Please use <Routes> and <Route>
2- You start from the component register and register a user on the database with a mutation (you create a form according to the project demo that contains three fields: email, password, confirmpassword.)
3- The next step is to build the LogIn component, with this code the user must be able to receive a token to enter other parts of the project.
4- In this step, a client component must be created and the token and user must be defined for the rest of the project components. You cannot create the dashboard without writing this step. 5- At this stage, build the dashboard according to the project demo and add the rest of the components to the project. You must use formik, yup, Polaris shopify in all stages. You can get help from the following installed packages to check the required packages of the project.

"dependencies": {
"@apollo/client": "^3.8.9",
"@emotion/react": "^11.11.3",
"@emotion/styled": "^11.11.0",
"@graphql-codegen/cli": "^5.0.2",
"@graphql-codegen/client-preset": "^4.2.2",
"@graphql-codegen/typescript-react-apollo": "^4.3.0",
"@satel/formik-polaris": "^1.1.1",
"@shopify/polaris": "^12.6.0",
"@shopify/polaris-icons": "^8.2.0",
"@testing-library/jest-dom": "^5.17.0",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"formik": "^2.4.5",
"graphql": "^16.8.1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.21.1",
"react-scripts": "5.0.1",
"use-debounce": "^10.0.0",
"web-vitals": "^2.1.4",
"yup": "^1.3.3"
},
Of course, when installing the packages, the version of the installed packages will be different depending on the node version used.
6- At this stage, the user logged in to the dashboard should be able to create a job, he should be able to delete or change the created job with the help of the EditJob component and see the list of created jobs.
