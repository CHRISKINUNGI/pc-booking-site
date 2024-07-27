/* Static assets go here */
Here’s a template for a README file for your PC booking site project. You can adjust the details according to your specific project needs.

```markdown
# PC Booking Site

A web application for managing PC bookings. Users can register, log in, view available PCs, and book them for a specified duration. Admins have access to manage the bookings.

## Features

- User registration and authentication
- View available PCs and their booking status
- Book PCs for a specified duration
- View current bookings

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **Sequelize**: ORM for Node.js
- **MySQL**: Database
- **EJS**: Templating engine
- **Bootstrap**: CSS framework for responsive design

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/pc-booking-site.git
    cd pc-booking-site
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root directory and add your environment variables:

    ```
    DB_HOST=localhost
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=Pc_booking_site
    SESSION_SECRET=your_secret_key
    ```

4. **Run Database Migrations**

    Ensure your database is set up and run the synchronization script:

    ```bash
    node sync.js
    ```

5. **Start the Application**

    ```bash
    npm start
    ```

    The application will run at `http://localhost:3000`.

## Usage

- **Register**: Navigate to `/register` to create a new user account.
- **Log In**: Go to `/login` to log in with your credentials.
- **View PCs**: After logging in, go to `/pcs` to see available PCs and their booking status.
- **Book a PC**: Use the form on the `/pcs` page to book a PC.

## Directory Structure

- **`/config`**: Contains database configuration.
- **`/models`**: Defines Sequelize models.
- **`/routes`**: Contains route handlers for different parts of the application.
- **`/views`**: EJS templates for rendering views.
- **`/public`**: Static files like CSS and JavaScript.
- **`server.js`**: Main entry point for the application.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [your email] or open an issue on GitHub.

---

Feel free to replace placeholders like `yourusername`, `your_database_user`, `your_database_password`, `your_secret_key`, and `your email` with your actual details.
```