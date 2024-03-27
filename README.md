# Description
This is a Tesla Shop based proyect (https://shop.tesla.com/category/apparel) with similar UI design and features.

## Run in DEV

1. Clone the repository
2. Create a copy of the file ```.env.template``` and rename it to ```.env``` and change the environment variables.
3. Install dependencies ``` npm install ```
4. Get up the database ```docker compose up -d```
5. Run the migrations of Prisma ORM ```npx prisma migrate dev```
6. Execute seed ```npm run seed```
7. Run the project ``` npm run dev ```

## Run in PRODUCTION