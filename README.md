This is my agency website built with React and Tailwind CSS.

## EmailJS Integration

This project uses EmailJS to send emails from the consultation form and calculator page.

### Setup Instructions

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new service or use an existing email service
3. Create a new template for your emails
4. Copy the following values from your EmailJS dashboard:
   - Service ID
   - Template ID
   - Public Key (User ID)

### Configuration

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### Email Templates

The application uses the following template variables:

For Consultation Form:
- `to_name`: Recipient name (set to "Folada Agency Team")
- `from_name`: Sender's full name (first name + last name)
- `business_name`: Business type
- `company_name`: Company name
- `phone`: Phone number
- `services`: Selected service
- `message`: Additional message
- `reply_to`: Email address (for replies)

For Calculator Form:
- `to_name`: Recipient name (set to "Folada Agency Team")
- `from_name`: Sender's name
- `phone`: Phone number
- `email`: Email address
- `company`: Company name
- `message`: Additional message
- `reply_to`: Email address (for replies)