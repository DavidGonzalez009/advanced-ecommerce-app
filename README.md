# Advanced React E-Commerce App

This is an e-commerce web app I built using React, TypeScript, React Query, Redux Toolkit, Firebase Authentication and Firestore. The goal of this project was to build a working online store where users can create an account, log in, browse products, filter by category, manage a shopping cart and complete a simulated checkout.

## Live App

The application is deployed on Vercel:

https://advanced-ecommerce-app-ten.vercel.app

## Features

- Register a new user account
- Login and logout
- Update user profile
- Delete user account
- View products stored in Firestore
- Filter products by category
- View product images, prices, descriptions, categories, and ratings
- Add new products
- Edit existing products
- Delete products
- Add products to the shopping cart
- Update product quantities
- Remove products from the cart
- View the total number of items in the cart
- Calculate the total price automatically
- Save cart data using sessionStorage
- Clear the entire shopping cart
- Require login before checkout
- Create an order during checkout
- View order history
- View order details
- Simulated checkout with a success message
- Responsive layout for different screen sizes

## Technologies Used

- React
- TypeScript
- Vite
- React Query
- Redux Toolkit
- React Redux
- Firebase Authentication
- Cloud Firestore
- sessionStorage
- Vitest
- React Testing Library
- GitHub Actions
- Vercel
- CSS

## Testing

I used Vitest and React Testing Library to test the application. The project includes unit tests for separate React components and an integration test for the shopping cart. The integration test simulates a user clicking the Add to Cart button and verifies that the selected product is added to the cart.

Tests can be run with:

```bash
npx vitest run
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and continuous deployment.

When code is pushed to the `main` branch, GitHub Actions:

1. Checks out the project.
2. Installs the dependencies.
3. Runs the automated tests.
4. Creates a production build.
5. Triggers the Vercel deployment only after the test and build job succeeds.

This helps make sure the application is tested and builds successfully before the deployment stage runs.

## How It Works

React Query is used to fetch and manage product data from Firestore. When a category is selected, the product list updates to show products from that category. Users can also create, edit and delete products with the changes saved in Firestore. Firebase Authentication handles user registration, login, logout, profile updates and account deletion. Users must be logged in before they can complete checkout.

Redux Toolkit handles the shopping cart. When a product is added, Redux keeps track of the product and its quantity. The cart automatically calculates the total number of items and total price. I used sessionStorage so the shopping cart does not disappear when the page is refreshed. When a logged in user checks out, an order is created and stored in Firestore. The user can then view their order history and the details of previous orders.

## How to Run the App

Clone the repository:

```bash
git clone https://github.com/DavidGonzalez009/advanced-ecommerce-app.git
```

Go into the project folder:

```bash
cd advanced-ecommerce-app
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Build

To create a production build:

```bash
npm run build
```

## What I Learned

This project gave me more practice working with React and TypeScript while using React Query, Redux Toolkit, Firebase Authentication and Firestore. I got more experience managing state across components, building a shopping cart, creating user authentication, working with a database, and creating order history.

I also learned how automated testing and CI/CD fit into the development process. I used Vitest and React Testing Library to test components and user interactions, GitHub Actions to automatically test and build the application, and Vercel to deploy the application after the CI process succeeds.
