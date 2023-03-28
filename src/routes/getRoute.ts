import { functionGet } from "./routes";
import * as Joi from "joi";

export = {
  method: "GET",
  path: "/get",

  handler: async function (request, h) {
    try {
      try {
        const user = JSON.parse(await functionGet(request.query.id));
        console.log(`User: ${user.firstName}`);

        return `Name: ${user.firstName} <br> E-mail: ${user.userEmail}`;
      } catch {
        return "User does not exist";
      }
    } catch (error) {
      console.log("GET request error");
      console.log(error);
    }
  },
  options: {
    description: "Get request",
    tags: ["api"],
    validate: {
      query: Joi.object({
        id: Joi.number().description("User ID"),
      }),
    },
  },
};
