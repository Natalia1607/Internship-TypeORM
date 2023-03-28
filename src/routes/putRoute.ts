import { functionPut } from "./routes";
import * as Joi from "joi";

export = {
  method: "PUT",
  path: `/put/{id}`,
  handler: async function (request, h) {
    try {
      const ID = request.params.id;

      if (await functionPut(ID, request.query)) {
        return "User does not exist";
      }
      return "Request completed successfully";
    } catch (error) {
      console.log("PUT request error");
      console.log(error);
    }
  },
  options: {
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.number().description("User ID"),
      }),
      query: Joi.object({
        userName: Joi.string().description("User name"),
        userEmail: Joi.string().description("E-mail"),
        userPass: Joi.string().description("Password"),
      }),
    },
  },
};
