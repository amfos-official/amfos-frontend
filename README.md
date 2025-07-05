# AMFOS Accounting Firm Website

This project is a modern web application for AMFOS, an accounting firm providing tax consultation, bookkeeping, and related financial services. The website is built using React and Vite for fast development and optimized performance.

## Features

- Responsive and user-friendly UI built with React
- Appointment booking system with integrated payment processing
- Contact form with email notifications
- Informative pages about services, team, and policies
- Backend API for handling appointments and payments
- Secure payment integration using Razorpay
- Email notifications using Nodemailer

## Technology Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Payment Gateway: Razorpay
- Email Service: Nodemailer
- Deployment: To be configured as per environment

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd amfos-react
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory and add necessary API keys and configuration, for example:

```
VITE_API_BASE_URL=http://localhost:<port>
RAZORPAY_KEY=your_razorpay_key
EMAIL_USER=email
EMAIL_PASS=your_email_password
```

4. Start the development server:

```bash
npm run dev
```

5. Start the backend server (in a separate terminal):

   To set up and start the backend server, please clone the backend repository.

   Follow the README.md in the backend directory to install dependencies, configure environment variables, and start the backend server.


## Project Structure

- `src/` - React frontend source code
- `public/` - Static assets and public files
- `README.md` - Project documentation

## Testing

- Manual testing of UI components and flows
- API endpoint testing using tools like Postman or Curl

## Contribution

Contributions are welcome. Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For any queries or support, contact us at support@amfos.in or call +91 90643 63937, 033 6618 3035.

---

Thank you for choosing AMFOS for your accounting and tax consultation needs.
