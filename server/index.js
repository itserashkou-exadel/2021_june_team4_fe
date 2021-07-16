const http = require("http");
const port = 3000;

const requestHandler = (request, response) => {
  response.setHeader("Content-Type", "application/json; charset=utf-8;");
  response.setHeader("Access-Control-Allow-Origin", "*");
  console.log(request);

  if (request.url === "/promo") {
    response.write(JSON.stringify({ id: "001", value: "summer_2021" }));
  } else if (request.url === "/favorits") {
    response.write(JSON.stringify(favorits));
  } else {
    response.write(
      JSON.stringify({ data: { message: "Welcome to the mock server" } })
    );
  }

  console.log(request.url);
  response.end();
};
const server = http.createServer(requestHandler);
server.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});

const favorits = {
  discount1: { id: "discountid ", name: "discount Name" },
  discount2: { id: "discountid2 ", name: "discount Name2" },
};
