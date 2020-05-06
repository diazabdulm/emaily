const surveysRouter = require("express").Router();
const mongoose = require("mongoose");
const { Path } = require("path-parser");
const { URL } = require("url");
const _ = require("lodash");

const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

surveysRouter.get("/api", requireLogin, async (request, response) => {
  try {
    const surveys = await Survey.find({ _ownedBy: request.user.id }).select(
      "-recipients"
    );
    response.send(surveys);
  } catch (error) {
    throw new Error(error);
  }
});

surveysRouter.get("/:surveyId/:choice", (request, response) => {
  response.send("Thanks for voting!");
});

surveysRouter.post(
  "/api",
  requireLogin,
  requireCredits,
  async (request, response) => {
    try {
      const { title, subject, body, recipients } = request.body;
      const newSurvey = await Survey({
        title,
        subject,
        body,
        recipients: recipients.split(",").map((email) => ({
          email: email.trim(),
        })),
        _ownedBy: request.user.id,
        dateSent: Date.now(),
      });
      const mailer = new Mailer(newSurvey, surveyTemplate(newSurvey));
      await mailer.send();
      await newSurvey.save();
      request.user.credits -= 1;
      const user = await request.user.save();
      response.send(user);
    } catch (error) {
      console.log(error);
      return response.status(422).send(error);
    }
  }
);

surveysRouter.post("/webhooks", async (request, response) => {
  const path = new Path("/surveys/:surveyId/:choice");
  _.chain(request.body)
    .map(({ email, url }) => {
      const match = path.test(new URL(url).pathname);
      if (match) return { email, ...match };
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each(({ surveyId, choice, email }) => {
      console.log(surveyId, choice, email);
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();
  response.send({});
});

module.exports = surveysRouter;
