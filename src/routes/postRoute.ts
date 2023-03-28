import { functionPost } from "./routes";
import { User } from "../entity/User";
import * as Joi from "joi";

export = {
  method: "POST",
  path: "/post",
  handler: function (request, h) {
    const payload = request.payload;
    try {
      let formObj: User = {
        id: payload.id,
        firstName: payload.userName,
        email: payload.email,
        password: payload.password,
      };

      functionPost(formObj);
    } catch (error) {
      console.log("POST request error");
      console.log(error);
    }
  },
  options: {
    tags: ["api"],
    plugins: {
      "hapi-swagger": {
        payloadType: "form",
      },
    },
    validate: {
      payload: Joi.object({
        username: Joi.string().description("User name"),
        email: Joi.string().description("E-mail"),
        password: Joi.string().description("Password"),
      }),
    },
  },
};
