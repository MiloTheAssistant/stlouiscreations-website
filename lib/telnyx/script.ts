/** Locked STL Creations_Bot caller copy. Do not rewrite. */
export const CREATIONS_DID_E164 = "+13143500006";

export const GREETING_COPY =
  "Thanks for calling St. Louis Creations. This call may be recorded. I just need your name, a number we can call back, and an email.";

export const SUCCESS_COPY = "Got it. Thanks for calling. We’ll follow up.";

export const FAILOVER_COPY = "Please leave a short message after the tone.";

export const GATHER_PARAMETERS = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "The caller's full name",
    },
    phone: {
      type: "string",
      description: "A number we can call back",
    },
    email: {
      type: "string",
      description: "The caller's email address",
    },
  },
  required: ["name", "phone", "email"],
} as const;

export const ASSISTANT_INSTRUCTIONS =
  "Collect only the caller's name, a callback phone number, and an email address. Do not quote prices, discuss products, send SMS, or email the caller. If the caller cannot provide those three fields or stops responding, end the gather.";
