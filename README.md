# Car Showroom Application

A full-stack web application for managing and browsing a car showroom. The application allows users to view available cars, manage inventory (for admins), and contact the showroom. It features user authentication for buyers and admins, with protected routes for secure access.

## Features

- **User Authentication**: Separate login/signup for buyers and admins.
- **Car Management**: View, add, update, and delete cars (admin only).
- **Car Browsing**: Browse available cars with detailed views.
- **Contact Form**: Submit inquiries to the showroom.
- **Admin Dashboard**: Manage cars and view contacts.
- **Responsive Design**: Built with React for a modern, responsive UI.
- **Protected Routes**: Secure access to certain pages based on user roles.

## Tech Stack

### Backend

- **Python/Flask**: Web framework for API development.
- **SQLAlchemy**: ORM for database management.
- **Flask-Migrate**: Database migrations.
- **Flask-CORS**: Cross-origin resource sharing.
- **SQLite**: Database for development.

### Frontend

- **React**: JavaScript library for building the UI.
- **React Router DOM**: Client-side routing.
- **Axios**: HTTP client for API requests.
- **Formik & Yup**: Form handling and validation.
- **CSS**: Custom styling.

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the Backend directory:

   ```bash
   cd Backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install flask flask-sqlalchemy flask-migrate flask-cors werkzeug
   ```

4. Run database migrations:

   ```bash
   flask db upgrade
   ```

5. (Optional) Seed the database with sample data:

   ```bash
   python seed.py
   ```

6. Start the backend server:
   ```bash
   python app.py
   ```
   The server will run on `http://localhost:5001`.

### Frontend Setup

1. Navigate to the car-showroom directory:

   ```bash
   cd car-showroom
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Sign up or log in as a buyer or admin.
3. Browse cars, view details, or access the admin dashboard (admin only).
4. Use the contact form to send inquiries.

## API Endpoints

### Cars

- `GET /cars` - List all cars
- `POST /cars` - Add a new car (admin)
- `GET /cars/<id>` - Get car details
- `PUT /cars/<id>` - Update car (admin)
- `DELETE /cars/<id>` - Delete car (admin)

### Authentication

- `POST /admin/signup` - Admin signup
- `POST /admin/login` - Admin login
- `POST /buyer/signup` - Buyer signup
- `POST /buyer/login` - Buyer login

### Contacts

- `GET /contacts` - List all contacts (admin)
- `POST /contacts` - Create a contact
- `GET /contacts/<id>` - Get contact details
- `PUT /contacts/<id>` - Update contact (admin)
- `DELETE /contacts/<id>` - Delete contact (admin)

## Project Structure

```
show_room/
├── Backend/
│   ├── app.py              # Flask application
│   ├── models.py           # Database models
│   ├── seed.py             # Database seeding script
│   ├── migrations/         # Alembic migrations
│   └── instance/           # Database files
├── car-showroom/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── App.js          # Main app component
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -am 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License.
