const mongoose = require("mongoose");
const chai = require("chai");
const supertest = require("supertest");
const { app } = require("../app.js");
const Client = require('../model/Client');
const { generateToken } = require('./test_utils');

const request = supertest(app);
const expect = chai.expect;

let token;

after(async function () {
    await mongoose.disconnect();
});

describe("User API Tests", function () {

    it("should create a new user", async function () {
        const newClient = {
            first_name: "Test",
            last_name: "User",
            mobile_no: "9818334098",
            city: "Janakpur",
            email: "test1@gmail.com",
            password: "Testuser@123"
        };

        const res = await request
            .post("/api/client/")
            .send(newClient);

        expect(res.status).to.equal(201);
        expect(res.body.client.first_name).to.equal("Test");
        expect(res.body.client.last_name).to.equal("User");
        expect(res.body.client.mobile_no).to.equal("9818334098");
        expect(res.body.client.city).to.equal("Janakpur");
        expect(res.body.client.email).to.equal("test1@gmail.com");
    });

    it("should fetch all users", async function () {
        const newClient = await Client.create({ first_name: "John", last_name: "Doe", mobile_no: "9841309876", city: "Bhaktapur", email: "johndoe@gmail.com", password: "Johndoe@123" });
        token = generateToken({ _id: newClient._id, email: newClient.email });

        const res = await request.get("/api/client/")
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0); 
    });

    it("should delete user by id", async function () {
        const newClient = await Client.create({ first_name: "John", last_name: "Doe", mobile_no: "9841309876", city: "Bhaktapur", email: "johndoe@gmail.com", password: "Johndoe@123" });
        token = generateToken({ _id: newClient._id, email: newClient.email, role: newClient.role });

        const res = await request.delete(`/api/client/${newClient._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(res.status).to.equal(200);
        const deletedClient = await Client.findById(newClient._id);
        expect(deletedClient).to.be.null;
    });

    it("should update user by id", async function () {
        const newClient = await Client.create({
            first_name: "John",
            last_name: "Doe",
            mobile_no: "9841309876",
            city: "Bhaktapur",
            email: "johndoe@gmail.com",
            password: "Johndoe@123",
            role: "client"
        });

        const updateData = {
            first_name: "John Updated",
            last_name: "Doe Updated",
            city: "Kathmandu"
        };

        token = generateToken({ _id: newClient._id, email: newClient.email, role: newClient.role });

        const res = await request
            .put(`/api/client/${newClient._id}`) 
            .set("Authorization", `Bearer ${token}`) 
            .send(updateData); 

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("first_name", "John Updated"); 
        expect(res.body).to.have.property("last_name", "Doe Updated"); 
        expect(res.body).to.have.property("city", "Kathmandu"); 

        const updatedClient = await Client.findById(newClient._id);
        expect(updatedClient.first_name).to.equal("John Updated");
        expect(updatedClient.last_name).to.equal("Doe Updated");
        expect(updatedClient.city).to.equal("Kathmandu");
    });
});