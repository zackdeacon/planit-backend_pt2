const nodemailer = require("nodemailer");

const TEAM_EMAIL_ADDRESS = 'teamplanitcartographers@gmail.com';
const PLANIT_URL = "https://www.google.com/";

//Create Transporter 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'teamplanitcartographers@gmail.com',
    pass: 'planitpassword1'
  }
});

const mailer = {
  sendEmail: async (options) => {
    options.from = TEAM_EMAIL_ADDRESS;
    return await transporter.sendMail(options);
  },
  invitation: {
    subject: ({ first, last }) => {
      return `${first} ${last} has invited you to help plan a trip with PLANiT!`;
    },
    text: ({ tripName, creatorName, isNewUser }) => {
      const instructions = isNewUser
        ? "signing up for an account"
        : "logging into your account";
      return `
        ${tripName}\n\n
        Help ${creatorName.first} plan this trip by visiting ${PLANIT_URL} and ${instructions}. You will then be able to view the trip itinerary, suggest ideas, vote on suggestions and chat with other people on the trip!\n
        See you there!
      `;
    },
    html: ({ tripName, creatorName, isNewUser }) => {
      const instructions = isNewUser
        ? "signing up for an account"
        : "logging into your account";

      return `
        <h1 style="margin-bottom: 25px; font-size: 1.25rem;">${tripName}</h1>
        <p style="margin-bottom: 15px;">
          Help ${creatorName.first} plan this trip by visiting <a href="${PLANIT_URL}">PLANiT</a> and ${instructions}.
        </p>
        <p style="margin-bottom: 15px;">Then you can: </p>
        <ul style="list-style: none; margin-left: 0; padding-left: 1em; text-indent: -1em;">
         <li>✅ View the trip itinerary</li>
         <li>✅ Suggest ideas</li>
         <li>✅ Vote on suggestions</li>
         <li>✅ Chat with others in the group</li>
        </ul>

        <p>See you there!</p>
      `;
    }
  },
}

module.exports = mailer;
