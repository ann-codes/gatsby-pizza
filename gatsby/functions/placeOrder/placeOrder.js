const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `<div>
  <h2>Your Recent Slick's Slices order for ${total}</h2>
  <p>Please start heading over, we will have your order ready in the next 20 minutes.</p>
  <ul>
    ${order
      .map(
        (item) => `<li><img src="${item.thumbnail}" alt="${item.name}"/>
    Size:${item.size} - ${item.name} - ${item.price}</li>`
      )
      .join('')}
  </ul>
  <h2>Your total is <strong>${total}</strong> due at pickup.</h2>
    <style>
        ul {
          list-style: none;
        }
        img {
          width: 200px;
        }
    </style>
</div>`;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// for artificial "loading" time
const wait = (ms = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

exports.handler = async (event, context) => {
  // await wait(5000);
  const body = JSON.parse(event.body);
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! you are missing the ${field} field.`,
        }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Oops! You forgot to add pizzas to your order!`,
      }),
    };
  }

  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: "Your Slick's Slices Order!",
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
