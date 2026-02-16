# AI-Powered Resume Screener (MERN)

An intelligent, event-driven resume screening application that leverages Google Gemini AI to analyze and score resumes against job descriptions. Built with a modern MERN stack and a microservices architecture using Kafka for scalable real-time notifications.

## 🚀 Features

- **AI Resume Scoring**: Automatically analyze resumes and extract skills, experience, and overall fit using Google Gemini AI.
- **Microservices Architecture**: Separate services for core logic and notifications, ensuring scalability and fault tolerance.
- **Real-time Notifications**: Instant updates via WebSockets (Socket.io) when resumes are processed.
- **Event-Driven**: Kafka-based communication between services for reliable background processing.
- **Analytics Dashboard**: Visualize resume scores and processing metrics with interactive charts (Recharts).
- **Email Updates**: Integrated email notifications for system alerts and status updates.
- **Secure Authentication**: Robust user authentication using JWT and bcrypt.

## 🛠 Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Visuals**: Lucide Icons, Recharts
- **Communication**: Socket.io-client, Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **AI**: Google Gemini AI (@google/generative-ai)
- **Messaging**: Apache Kafka (KafkaJS)
- **Notifications**: Redis (optional/future), Socket.io, Nodemailer

### Infrastructure
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kafka (Confluent Platform)

## 🏗 Project Structure

```bash
.
├── Backend
│   ├── main_service          # Core logic, AI processing, user management
│   └── notification_service  # WebSocket & email notification handler
├── resumeScreeenerFrontend   # React-based frontend application
├── docker-compose.yml        # Orchestration for all services
└── README.md                 # Project documentation
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- Docker and Docker Compose
- MongoDB (Atlas or Local)
- Google Gemini API Key

### Environment Setup

Create `.env` files for each service based on the following templates:

#### Main Service (`./Backend/main_service/.env`)
```properties
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
KAFKA_BROKER=kafka:9092
EMAIL=your_email
EMAIL_PASSWORD=your_app_password
```

#### Notification Service (`./Backend/notification_service/.env`)
```properties
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
KAFKA_BROKER=kafka:9092
```

#### Frontend (`./resumeScreeenerFrontend/.env`)
```properties
VITE_API_BASE_URL=http://localhost:5050/api
VITE_NOTIFICATION_SERVICE_URL=http://localhost:5051
```

### Running with Docker (Recommended)

The easiest way to start the entire stack including Kafka and Zookeeper:

```bash
docker-compose up --build
```

### Running Locally (Manual)

1. **Start Kafka**: Ensure Zookeeper and Kafka are running locally.
2. **Start Backend Services**:
   ```bash
   cd Backend/main_service && npm install && npm start
   cd Backend/notification_service && npm install && npm start
   ```
3. **Start Frontend**:
   ```bash
   cd resumeScreeenerFrontend && npm install && npm run dev
   ```

## 📝 API Endpoints (Highlights)

### Auth
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate and get token

### Resumes
- `POST /api/resumes/upload` - Upload and process resume with AI
- `GET /api/resumes/` - List all processed resumes

### Notifications
- `GET /api/notifications` - Fetch notification history

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
