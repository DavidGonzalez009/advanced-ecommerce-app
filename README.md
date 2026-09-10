# Advanced React E-Commerce App

This is an e-commerce web app I built using React, TypeScript, React Query and Redux Toolkit. The goal of this project was to build a working online store where users can browse products, filter by category, add products to a shopping cart, and complete a simulated checkout. The products and categories are pulled from the FakeStoreAPI.

## Features

- View products from the FakeStoreAPI
- Filter products by category
- View product images, prices, descriptions, categories and ratings
- Add products to the shopping cart
- Add the same product multiple times and update the quantity
- Remove products from the cart
- View the total number of items in the cart
- Calculate the total price automatically
- Cart data is saved using sessionStorage
- Clear the entire shopping cart
- Simulated checkout with a success message
- Responsive layout for different screen sizes

## Technologies Used

- React
- TypeScript
- Vite
- React Query
- Redux Toolkit
- React Redux
- Axios
- FakeStoreAPI
- sessionStorage
- CSS

## How It Works

React Query is used to fetch the products and categories from the FakeStoreAPI. When a category is selected, the product list updates to show products from that category. Redux Toolkit handles the shopping cart. When a product is added, Redux keeps track of the product and its quantity. The cart also calculates the total number of items and the total price. I used sessionStorage so the shopping cart does not disappear when the page is refreshed. When the user checks out or clears the cart, the Redux state and sessionStorage are cleared.

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

This project gave me more practice working with React and TypeScript while also introducing me to using React Query and Redux Toolkit together. I got more experience fetching API data, managing state across components, working with shopping cart logic, and using sessionStorage to keep data after a page refresh.
