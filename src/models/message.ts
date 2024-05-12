import { z } from "zod";

const MessageSchemaDef = z.object({
  id: z.string(),
  room: z.number(),
  author: z.string(),
  body: z.string(),
});

type Message = z.infer<typeof MessageSchemaDef>;
export default Message;
