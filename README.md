# 🐾 PawConnect

A web-based pet adoption platform that provides a structured and reliable system for connecting pet owners/sellers with potential adopters. PawConnect ensures users have access to complete and verified information before making adoption decisions, promoting responsible pet ownership.

---

## 🛠️ Technology Stack and Tools Used

| Category        | Tool / Technology        | Purpose                                      |
|----------------|--------------------------|----------------------------------------------|
| Language        | JavaScript (ES6+)        | Core development for frontend and backend    |
| Language        | HTML5 / CSS3             | User interface design and styling            |
| Framework       | React.js                 | Frontend development and UI components       |
| Framework       | Node.js                  | Backend runtime environment                  |
| Framework       | Express.js               | RESTful API development                      |
| Library         | Mongoose                 | MongoDB object modeling                      |
| Library         | Axios                    | API communication between frontend and backend |
| Library         | JSON Web Token (JWT)     | Authentication and authorization             |
| Library         | Multer                   | File upload handling                         |
| Cloud Service   | Cloudinary               | Image storage and management                 |
| Database        | MongoDB                  | NoSQL database for storing application data  |
| IDE             | Visual Studio Code       | Code editor with extensions                  |
| Version Control | Git + GitHub             | Source code management                       |
| Testing         | Postman                  | API testing and debugging                    |

---

## ✨ Features and Functionalities Implemented

### 👥 User Roles
- **System Administrator** — Manages user accounts, verifies pet listings, monitors system activity, handles reports, and ensures data authenticity.
- **Pet Owner / Seller** — Lists pets for adoption; can add, update, and delete pet details along with images and medical/license information.
- **Adopter / User** — Browses pet listings, views detailed pet information, uploads required documents, and completes the adoption process.

### 🔑 Core Features
- **User Registration & Login** — Secure registration using name, email, and password; JWT-based authentication.
- **Pet Listing Creation & Management** — Add, update, and delete pet listings with details like name, breed, age, images, and description.
- **Browse & View Pets** — Users can browse all available pets on the homepage and view detailed information for each pet.
- **Adoption Process** — Users can apply for adoption, upload identity/verification documents, and accept a legal agreement to complete adoption.
- **Document Upload** — Secure upload of identity and verification documents via Cloudinary.
- **Notification System** — Notifications are sent to users after adoption confirmation and for future pet care reminders.
- **Admin Dashboard** — Admins can manage users, verify listings, view adoption records, and generate reports.
- **Role-Based Dashboard** — Each user type (Admin, Owner, Adopter) has a dedicated dashboard with relevant functionalities.

---

## 🚀 Installation & Execution Steps

### Prerequisites
- Node.js v16 or higher — [Download here](https://nodejs.org/)
- MongoDB installed locally or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/pawconnect.git
cd pawconnect
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:
```bash
nodemon server.js
```

### 3. Setup Frontend
Open a new terminal:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```
> The backend runs on `http://localhost:5000` by default.

---

## 👩‍💻 Authors

| Name                | Enrollment No.   |
|---------------------|------------------|
| Taruna Agrawal      | EN23CS3011079    |
| Tanzila Khan        | EN23CS3011078    |
| Tanishk Raghuwanshi | EN23CS3011068    |

**Under the Guidance of:**  
Prof. Arjun Dixit & Prof. Rashmi Vijayvargiya

**Department of Computer Science & Engineering**  
Medicaps University, Indore – 453331