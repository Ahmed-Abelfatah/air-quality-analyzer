## 🌫️ Air Quality API Endpoints

- 📍 `GET {BASE_URL}/v1/api/air-quality/timeseries/:parameter` — Returns time series data for a given **parameter**.
- 📍 `GET {BASE_URL}/v1/api/air-quality/range` — Returns data filtered by **date range**.
- 📍 `GET {BASE_URL}/v1/api/air-quality/filter/:parameter` — Returns data for a given **parameter** within a **date range**.

### ⚠️ API Limitations

To improve performance and prevent misuse that could lead to slow responses or potential crashes, we’ve introduced a few limitations:

- 📅 **Date Range Restriction:** Requests that depend on a date range are limited to a **maximum range of one month**.
- 📊 **Max Entries Limit:** Each API call can return a **maximum of 10,000 items**.  
  While pagination could be applied, we opted not to implement it for now to keep the UI integration simple.

## Important links
- :rocket: :rocket: [Demo](https://www.youtube.com/watch?v=d2ZAX7ml_Hw) :point_left: :point_left:
- :rocket: :rocket: [Deployment link](https://air-quality-analyzer-80wm.onrender.com/docs/) :point_left: :point_left:

## Tech-Stack

- :office: Scaffolding ( Husky , prettier , linter)
- :dart: CI/CD (Gitlab pipline with the following stages)
  - :one: Install dependancies.
  - :two: Building the code.
  - :three: Testing
    - code style test
  - :four: Publishing stage to build a docker image in container registery
- :steam_locomotive: Backend (NodeJS Typescript)
- :steam_locomotive: API (REST)
- :telephone: Git (trunk based development)
- Logs (Console)
- :rocket: Deployment (Docker,CI/CD) and render as a cloud provider
- :rocket: Documentation (Swagger open API)
  - Local-server: http://localhost:3003/docs
  - Remote-server: https://air-quality-analyzer-80wm.onrender.com/docs

## :eyes: Getting Started

Clone the project , install the dependancies and run it locally as development or you can pull the docker image from the container registery and run it locally.

### :bangbang: Prerequisites

Make sure that your environment setup has the follwoing installed on your machine:

- NodeJS v23.0.0 And No-SQL [mongo-db]
- Typescript
- Docker If you want run the image locally
- Git

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file and `.env.example` already pushed to gitlab as a reference

- `PORT`
- `MONGODB_URI`

## :gear: Running Locally from Development Environment

- **Clone the repository:**

  ```bash
  git clone https://github.com/Ahmed-Abelfatah/air-quality-analyzer.git
  cd air-quality-analyzer

  ```

- Install dependencies:

  ```bash
  yarn

  ```

- Configure environment variables:

  - If you have a MongoDB Atlas account, add your connection string in the .env file.

  ```bash
  MONGODB_URI=your_mongo_connection_string

  ```

- Seed the database:

  - Run the following command to parse the file data and populate the database:

  ```bash
  yarn run seed

  ```

- Start the project in development mode:
  ```bash
  yarn run start-dev
  ```
- Start the project in production mode:
  ```bash
  yarn run start
  ```

### 🚩 Try the API via Swagger UI

- Open your browser and navigate to:
  - 👉 https://localhost:3003/docs

### :gear: Running the project by using docker

Make sure first the docker/docker-compose installed on your machine inside the project directory just run the following command.

```
docker-compose up -d
```

It will start downloading the mongodb image and build the backend service based on the docker file that we have already inside the project directory.

Then you can seed the data by running the following command `docker exec -it {docker-container-id} sh` then run the following command it will start the db seeding process

:triangular_flag_on_post: To use and try API from Swagger UI https://localhost:3003/docs

## Design Patterns Used to Provide Flexibility

- **Repository Pattern** in the database layer  
  Helps abstract the data access logic, making it easier to switch data sources or mock the database during testing.

- **Strategy Pattern** in the data processing layer  
  Enables dynamic selection of processing algorithms at runtime, promoting extensibility and cleaner code separation.
