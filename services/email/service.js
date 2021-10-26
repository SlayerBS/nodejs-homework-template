const Mailgen = require("mailgen");

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://localhost:5999";

        break;
      case "production":
        this.link = "link for production";

        break;
      default:
        break;
    }
  }
  createTemplateemail(name, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "neopolitan",
      product: {
        name: "cats and your pets",
        link: this.link,
      },
    });

    const email = {
      body: {
        name,
        intro:
          "Welcome to Cats and your pets! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Mailgen, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    };
    return mailGenerator.generate(email);
  }
  async sendVerifyEmail(email, name, verifyToken) {
    const emailHTML = this.createTemplateemail(name, verifyToken);
    const msg = {
      to: email,
      subject: "Verify your email",
      html: emailHTML,
    };
    try {
      const result = await this.sender.send(msg);
      console.log(result);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}

module.exports = EmailService;
