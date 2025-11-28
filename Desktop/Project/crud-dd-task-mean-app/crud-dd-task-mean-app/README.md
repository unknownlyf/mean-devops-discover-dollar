```
# 🔥 MEAN Stack DevOps Deployment — Docker + Nginx + AWS

This DevOps task involves building and deploying a full-stack CRUD application using the MEAN stack (MongoDB, Express, Angular 15, Node.js) and fully containerizing it using Docker and Docker Compose, then deploying on AWS EC2 with Nginx reverse proxy.

---

## 🚀 Features

- Full-stack MEAN CRUD application
- Backend Node.js + Express — REST API
- Frontend Angular — UI for CRUD + Search
- MongoDB as containerized database
- Dockerized frontend + backend separately
- Docker Compose orchestration (frontend + backend + DB)
- Nginx reverse proxy on AWS
- API served under `/api`
- Tested end-to-end in production on EC2

---

## 🧠 Application Description

This app manages a list of tutorials. Each tutorial contains:

- ID
- Title
- Description
- Published status

Users can:

- Create tutorial
- Retrieve list of tutorials
- Update tutorial
- Delete tutorial
- Search by title

---

## 🐳 Docker Architecture

### Containers

| Service    | Description |
|------------|-------------|
| frontend   | Angular UI served via Nginx container |
| backend    | Node.js Express API |
| mongo      | MongoDB container |

### docker-compose.yml

version: "3.9"

services:
  mongo:
    image: mongo:6
    container_name: mongo
    restart: always
    volumes:
      - mongo-data:/data/db

  backend:
    image: unknown7777/backend:1.0
    container_name: backend
    restart: always
    environment:
      - MONGO_URI=mongodb://mongo:27017/tutorialsdb
    ports:
      - "3000:3000"
    depends_on:
      - mongo

  frontend:
    image: unknown7777/frontend:1.5
    container_name: frontend
    restart: always
    ports:
      - "4200:80"
    depends_on:
      - backend

volumes:
  mongo-data:

Run containers:

docker compose up -d

---

## 🌐 Nginx Reverse Proxy (on AWS host)

server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:4200;
    }

    location /api {
        proxy_pass http://127.0.0.1:3000/api;
    }
}

Important fix:

✅ Correct: proxy_pass http://127.0.0.1:3000/api;

❌ Incorrect: proxy_pass http://127.0.0.1:3000/api/;

---

## ☁️ AWS EC2 Deployment

Install required services:

sudo apt update
sudo apt install -y docker.io docker-compose nginx
sudo systemctl enable docker
sudo systemctl start docker

Run containers:

docker compose up -d
sudo systemctl restart nginx

Access UI:

http://<EC2_PUBLIC_IP>

Example: http://3.90.183.113

---

## 🧪 Testing

From backend:

curl http://127.0.0.1:3000/api/tutorials

From MongoDB:

docker exec -it mongo mongosh
show dbs;

From UI:

Open browser and test CRUD operations

---

## 🛠 Local Developer Mode (optional)

Backend:

cd backend
npm install
node server.js

Frontend:

cd frontend
npm install
ng serve --port 8081

Access UI at: http://localhost:8081

---

## 🧩 Problems Faced & Fixes

| Issue | Fix |
|-------|-----|
| CORS errors | Routed all calls through Nginx so both frontend & backend share origin |
| /api not forwarding | Removed trailing slash in proxy_pass |
| Angular build not showing | Used Nginx inside frontend image |
| MongoDB connection refused | Used mongo hostname inside Docker Compose |
| Git pushed large Mongo DB data | Used .gitignore & removed local DB files |

---

## 👤 Author

Shreyas Satpute
DevOps & Security Engineer

---

## 🎉 Final Result

✔ App successfully containerized
✔ Runs using Docker Compose
✔ Works on AWS EC2
✔ Frontend served through Nginx
✔ API forwarded via reverse proxy
✔ CRUD fully functional

---

## 📦 Docker Hub Images

- Frontend: unknown7777/frontend:1.5
- Backend: unknown7777/backend:1.0

---

## 🔗 Links

- GitHub Repository: https://github.com/unknownlyf/mean-devops-discover-dollar
- Live Demo: http://3.90.183.113
```
