# 📚 Learning API

This is a **NestJS-based Learning API** that allows users to view subjects, topics, and track learning progress. It also includes user rankings based on completion rates.

## 🚀 Features

- **User Authentication** (Signup, Login & Get Auth User)
- **List Subjects**
- **View Topics by Subject**
- **View Topic Details** (Title, Video, Description)
- **Track Topic Completion**
- **Rank Learners by Completion Rate**
- **Admin Management** (Add subjects & topics, view rankings)

---

## 🛠️ Tech Stack

- **NestJS** (Backend Framework)
- **PostgreSQL** (Database)
- **Prisma ORM** (Database Management)

---

## 📌 Setup Instructions

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/ayeolakenny/learning-api
cd learning-api
```

### 2️⃣ Install Dependencies

```sh
pnpm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and configure:

```
PORT=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRY=
```

### 4️⃣ Run Database Migrations

```sh
npx prisma migrate dev
```

### 5️⃣ Seed the Database (Admin Credentials)

Run the following command to seed an admin user:

```sh
npx prisma db seed
```

### 6️⃣ Start the Development Server

```sh
pnpm start:dev
```

---

## 📌 API Endpoints

### 🔹 **Authentication**

| Method | Endpoint       | Description     | Auth |
| ------ | -------------- | --------------- | ---- |
| POST   | `/auth/signup` | Register a user | ❌   |
| POST   | `/auth/login`  | User login      | ❌   |
| GET    | `/auth/user`   | Get auth user   | ✅   |

### 🔹 **Subjects**

| Method | Endpoint               | Description            | Auth     |
| ------ | ---------------------- | ---------------------- | -------- |
| GET    | `/subjects`            | List all subjects      | ✅       |
| GET    | `/subjects/:id`        | Get a single subject   | ✅       |
| POST   | `/subjects`            | Create a new subject   | 🔐 Admin |
| POST   | `/subjects/:id/topics` | Add topic to a subject | 🔐 Admin |

### 🔹 **Topics**

| Method | Endpoint                      | Description             | Auth       |
| ------ | ----------------------------- | ----------------------- | ---------- |
| GET    | `/subjects/topics/:id`        | Get topic details       | ✅         |
| POST   | `/subjects/complete/:topicId` | Mark topic as completed | 🔐 Student |

### 🔹 **Tracking & Rankings**

| Method | Endpoint                        | Description              | Auth       |
| ------ | ------------------------------- | ------------------------ | ---------- |
| GET    | `/subjects/:id/user-completion` | Get user completion rate | 🔐 Student |
| GET    | `/subjects/:id/rankings`        | Get subject rankings     | 🔐 Admin   |

---

## 🔗 Postman Collection

You can find the Postman collection here:
[Postman Collection Link](https://documenter.getpostman.com/view/9115404/2sAYXBHfWh)

---

## 🌍 Deployed API

[Deployed API URL](https://learning-api-m2e2.onrender.com)
