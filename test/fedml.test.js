const fedml = require("../src/services/fedml.service");
const dotenv = require("dotenv");
dotenv.config();

test("say Merhaba", async () => {
  const response = await fedml.getTestResponse({ testRepsonse: "Merhaba" });
  console.log(response);
  expect(response.choices[0].message.content).toContain("Merhaba");
});
