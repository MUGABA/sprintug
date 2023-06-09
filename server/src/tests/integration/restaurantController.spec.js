import req from "supertest";
import app from "../../app";
import User from "../../models/UsersModel";

describe("Restaurant Test", () => {
  let server;
  beforeEach(() => {
    server = app;
  });
  afterEach(async () => {
    await server.close();
    await User.deleteMany({});
  });

  describe("View All Restaurants", () => {
    let res;

    const exec = async () => {
      return await req(server).get("/rest");
    };

    it("should return 200 Whether there are Restaurants available or not", async () => {
      res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("Add and Update Restaurant", () => {
    let name, location, cuisineType, image, restaurantId;
    let res;
    let token;

    beforeEach(async () => {
      const name = "Sprint Ug",
        email = "springug@support.com",
        password = "Spring@123";
      const res = await req(server)
        .post("/auth")
        .send({ name, email, password });

      token = res.body.token;
    });

    const exec = async () => {
      return await req(server)
        .post("/rest/add")
        .set("x-auth-token", token)
        .send({ name, location, cuisineType, image, restaurantId });
    };

    it("should return 400 if any sign up requirements is not provided", async () => {
      name = "";
      location = "Kampala Kisenyi";
      cuisineType = "Chinese Cuisine";
      image = "";
      res = await exec();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 201 if all data it provided", async () => {
      name = "New Restaurant";
      location = "Kampala Kisenyi";
      cuisineType = "Chinese Cuisine";
      image = "";
      restaurantId;

      res = await exec();

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("Get Restaurant by Id", () => {
    let restaurantId;
    let res;
    let token;

    beforeEach(async () => {
      const name = "Sprint Ug",
        email = "springug@support.com",
        password = "Spring@123";
      const res = await req(server)
        .post("/auth")
        .send({ name, email, password });
      token = res.body.token;
    });

    beforeEach(async () => {
      let name = "New Restaurant",
        location = "Kampala Kisenyi",
        cuisineType = "Chinese Cuisine",
        image = "";
      const res = await req(server)
        .post("/rest/add")
        .set("x-auth-token", token)
        .send({ name, location, cuisineType, image, restaurantId });

      restaurantId = res.body.data._id;
    });

    const exec = async () => {
      return await req(server)
        .get(`/rest/get-rest/${restaurantId}`)
        .set("x-auth-token", token);
    };

    it("should return 200 if id provided is okay", async () => {
      res = await exec();

      expect(res.status).toBe(200);
    });

    it("should return 404 if id provided does not exist", async () => {
      restaurantId = "64823baa3842858bc8ddc810";
      res = await exec();

      expect(res.status).toBe(404);
    });
  });

  describe("Delete Restaurant by Id", () => {
    let restaurantId;
    let res;
    let token;

    beforeEach(async () => {
      const name = "Sprint Ug",
        email = "springug@support.com",
        password = "Spring@123";
      const res = await req(server)
        .post("/auth")
        .send({ name, email, password });
      token = res.body.token;
    });

    beforeEach(async () => {
      let name = "New Restaurant",
        location = "Kampala Kisenyi",
        cuisineType = "Chinese Cuisine",
        image = "";
      const res = await req(server)
        .post("/rest/add")
        .set("x-auth-token", token)
        .send({ name, location, cuisineType, image, restaurantId });

      restaurantId = res.body.data._id;
    });

    const exec = async () => {
      return await req(server)
        .delete(`/rest/delete-rest/${restaurantId}`)
        .set("x-auth-token", token);
    };

    it("should return 200 if id provided is okay and deleted", async () => {
      res = await exec();

      expect(res.status).toBe(200);
    });
  });
});
