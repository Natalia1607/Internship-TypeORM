import { functionDelete } from "./routes";
import * as Joi from "joi";

export = {
  method: "DELETE",
  path: `/delete/{id}`,
  handler: async function (request, h) {
    try {
      const ID = request.params.id;
      if (await functionDelete(ID)) {
        return "User does not exist";
      }
      console.log("Request completed successfully");
    } catch (error) {
      console.log("DELETE request error");
      console.log(error);
    }
  },
  options: {
    description: "Delete request",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.number().description("User ID"),
      }),
    },
  },
};
