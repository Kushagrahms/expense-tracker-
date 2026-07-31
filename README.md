<div align="center">

# 💰 Expense Tracker

A full-stack expense management application built with React, Flask, MySQL, Docker, and Kubernetes to help users efficiently track income, expenses, and financial records.

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white)

</div>

---

📖 About

Expense Tracker is a full-stack web application that enables users to securely manage their personal finances by tracking income, expenses, and transaction history through an intuitive dashboard.

The application uses a React frontend and a Flask backend with MySQL as the database. It also includes Docker and Kubernetes configurations to demonstrate containerized deployment and orchestration.

-- 

📸 Application Preview
# Login
<img width="500" height="400" alt="image" src="https://github.com/user-attachments/assets/b4efe11a-51be-4b0c-9a72-238f9fc80dac" />

# Dashboard
<img width="700" height="500" alt="image" src="https://github.com/user-attachments/assets/4d5a1dc3-687c-49bb-b7cb-837bb9e772f8" />

# Add Expense
<img width="800" height="600" alt="image" src="https://github.com/user-attachments/assets/3c5cc268-8349-4c3a-90ff-57fc22c2df29" />

# Reports
<img width="700" height="500" alt="image" src="https://github.com/user-attachments/assets/4088822e-4479-463e-8353-061476192b56" />
<img width="700" height="500" alt="image" src="https://github.com/user-attachments/assets/b6c8f1f3-2041-4a7e-abc0-aeb4312d9ff9" />

---

✨ Features

- 🔐 User Authentication
- 💰 Income & Expense Management
- 📊 Dashboard Overview
- 📅 Transaction History
- 🗂 Category-wise Expense Tracking
- 🐳 Dockerized Deployment
- ☸ Kubernetes Deployment Configuration
- 💾 MySQL Database Integration

---

🏗 Architecture

```mermaid
flowchart TD

    A[👤 User] --> B[React Frontend]

    B -->|HTTP Requests| C[Flask REST API]

    C --> D[JWT Authentication]

    D --> E[Expense Management Service]

    E --> F[(MySQL Database)]

    subgraph Database
        F --> G[Users]
        F --> H[Income]
        F --> I[Expenses]
        F --> J[Categories]
    end

    subgraph Deployment
        B
        C
        F
    end

    Deployment --> K[Docker]

    K --> L[Kubernetes]
```

---


🛠 Tech Stack

| Category | Technologies |
|-----------|--------------|
| Frontend | React.js, CSS, Axios |
| Backend | Flask (Python) |
| Database | MySQL |
| Containerization | Docker |
| Orchestration | Kubernetes |

---


📂 Project Structure

```text
Expense-Tracker
│
├── frontend/
├── backend/
├── kubernetes/
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

⚙ Getting Started

# Clone Repository

```bash
git clone https://github.com/Kushagrahms/expense-tracker.git
```

# Install Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

# Run Backend

```bash
python run.py
```

# Install Frontend

```bash
cd frontend

npm install

npm run dev
```

# Docker

```bash
docker compose up --build
```

# Kubernetes

```bash
kubectl apply -f kubernetes/
```

---

📌 Future Improvements
- Export Reports (PDF/Excel)
- Email Notifications
- CI/CD Pipeline

---

👨‍💻 Author

**Kushagra Shrivastava**

If you found this project useful, feel free to ⭐ the repository.
