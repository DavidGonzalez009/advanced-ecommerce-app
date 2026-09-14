# Advanced React E-Commerce App

This is an e-commerce web app I built using React, TypeScript, React Query, Redux Toolkit, Firebase Authentication and Firestore. The goal of this project was to build a working online store where users can create an account, log in, browse products, filter by category, manage a shopping cart and complete a simulated checkout. Products, users and orders are stored in Cloud Firestore, while Firebase Authentication handles user accounts and login.

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
- Add the same product multiple times and update the quantity
- Remove products from the cart
- View the total number of items in the cart
- Calculate the total price automatically
- Cart data is saved using sessionStorage
- Clear the entire shopping cart
- Checkout requires the user to be logged in
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
- CSS

## How It Works

React Query is used to fetch and manage product data from Firestore. When a category is selected the product list updates to show products from that category. Users can also create, edit and delete products with the changes being saved in Firestore. Firebase Authentication handles user registration, login, logout, profile updates and account deletion. Users must be logged in before they can complete checkout. Redux Toolkit handles the shopping cart. When a product is added Redux keeps track of the product and its quantity. The cart automatically calculates the total number of items and the total price. I used sessionStorage so the shopping cart does not disappear when the page is refreshed. When a logged in user checks out an order is created and stored in Firestore. The user can then view their order history and see the details of previous orders.

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

This project gave me more practice working with React and TypeScript while introducing me to React Query, Redux Toolkit, Firebase Authentication and Firestore. I got more experience managing state across components, working with a shopping cart, creating user authentication, storing and retrieving data from a database and creating order history. I also got more practice connecting different parts of an application together and seeing how the frontend, authentication, state management, and database can all work together in one project.
