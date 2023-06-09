import req from "supertest";
import app from "../../app";
import User from "../../models/UsersModel";

describe("User Test", () => {
  let server;
  beforeEach(() => {
    server = app;
  });
  afterEach(async () => {
    await server.close();
    await User.deleteMany({});
  });

  describe("Registration /", () => {
    let email;
    let password;
    let name;
    let res;

    const exec = async () => {
      return await req(server).post("/auth").send({ name, email, password });
    };

    it("should return 400 if any sign up requirements is not provided", async () => {
      name = "";
      email = "springug@support.com";
      password = "Spring@123";

      res = await exec();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if email is invalid", async () => {
      name = "Sprint Ug";
      email = "springugsupport.com";
      password = "Spring@123";

      res = await exec();
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if password is below six characters", async () => {
      name = "Sprint Ug";
      email = "springug@support.com";
      password = "Spri";
      res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 200 if both email and password are valid", async () => {
      name = "Sprint Ug";
      email = "springug@support.com";
      password = "Spring@123";

      res = await exec();

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token");
    });
  });

  describe("/login", () => {
    let email;
    let password;
    let name;
    let res;

    const exec = async () => {
      return await req(server).post("/auth/login").send({ email, password });
    };

    beforeEach(async () => {
      name = "Sprint Ug";
      email = "springug@support.com";
      password = "Spring@123";
      return await req(server).post("/auth").send({ name, email, password });
    });

    it("should return 400 if any login requirements is not provided", async () => {
      email = "";
      password = "Rashid";

      res = await exec();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
    it("should return 400 if email does not exist", async () => {
      email = "spring@support.com";
      password = "Spring@123";

      res = await exec();
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if password does not match user password", async () => {
      email = "springug@support.com";
      password = "Spring@12";
      res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 200 if both email and password are valid", async () => {
      email = "springug@support.com";
      password = "Spring@123";
      res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
  });
});
