(async () => {
  const redis = require("redis");

  const client = redis.createClient({
    socket: { host: "containers-us-west-152.railway.app", port: 7926 },
    password: "z8MDcTMJO4rc2Nfp6fum",
  });

  await client.connect();

  await client.set("name", "Enrique");
  console.log(`Your name is ${await client.get("name")}`);

  process.exit(0);
})();
