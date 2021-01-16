# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


---
---
# `Hello, Hope You liked the app`
---
##  `Here are some details about the app`
---
- The app was designed using the MERN stack (basically used this project to learn about React)
- It has an optimised search feature that allows you to search by category
- Products get updated as it is being inserted in the DB
- There are different routes for admin and user
- You can check the app at this link: https://bayurzx.xyz/  
- You can make payments with credit card on app using 4111 1111 1111 1111 and 12/22 . This is not real money, just a sandbox experience. I disabled the PayPal feature
- Braintree was used here but I can implement any other fintech service such as Paystack/ Stripe etc

# `Some Heads Up`
## `You might see some bugs`
---
-  Braintree sandbox does not allow over a certain amount (1,000,000 was tested) to checkout. I found this bug late so you might want to create a error handler for that. It is printed on the console
-  The PayPal link is not working because I deactivated it in my account so no worries there
-  I basically didn't use CSS sorry about that if you find the design vanilla, But I can definitely switch it up if you want I myself is a bit experinced in frontend.
-  You might want to encrypt data being saved on the client storage for extra security

### `Feel free to contact me on bayurzx@gmail.com` if you discover any bug or or wanna chat
