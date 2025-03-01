const mongoose = require("mongoose");
const chai = require("chai");
const supertest = require("supertest");
const { app } = require("../app.js");
const Freelancer = require('../model/Freelancer');
const Service = require("../model/Service");
const Freelancer_Service = require("../model/Freelancer_Service");
const { generateToken } = require('./test_utils');

const request = supertest(app);
const expect = chai.expect;

let token;

after(async function () {
    await mongoose.disconnect();
});

describe("Freelancer Service API Tests", function () {
    it("should create a new freelancer service", async function () {
        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        token = generateToken({ _id: newFreelancer._id, email: newFreelancer.email, role: newFreelancer.role });

        const newService = await Service.create({service_name: `service_${Date.now()}`});

        const newFreelancerService = {
            hourly_rate: "1500",
            service_id: newService._id,
            freelancer_id: newFreelancer._id
        }

        const res = await request
            .post("/api/freelancer-service/")
            .set("Authorization", `Bearer ${token}`)
            .send(newFreelancerService);

        expect(res.status).to.equal(201);
    });

    it("should fetch all freelancer service of a freelancer", async function () {
        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        token = generateToken({ _id: newFreelancer._id, email: newFreelancer.email, role: newFreelancer.role });

        const newService2 = await Service.create({service_name: `service_${Date.now()}`});
        const newService3 = await Service.create({service_name: `service_${Date.now()}`});

        const newFreelancerService1 = await Freelancer_Service.create({hourly_rate: "1500", service_id: newService2._id, freelancer_id: newFreelancer._id});
        const newFreelancerService2 = await Freelancer_Service.create({hourly_rate: "2200", service_id: newService3._id, freelancer_id: newFreelancer._id});

        const res = await request.get(`/api/freelancer-service/freelancer/${newFreelancer._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0); 
    });

    it("should update freelanacer service by id", async function () {
        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        token = generateToken({ _id: newFreelancer._id, email: newFreelancer.email, role: newFreelancer.role });

        const newService = await Service.create({service_name: `service_${Date.now()}`});

        const newFreelancerService = await Freelancer_Service.create({hourly_rate: "1500", service_id: newService._id, freelancer_id: newFreelancer._id});
        const updateData = {
            hourly_rate: "6000",
        };

        const res = await request
            .put(`/api/freelancer-service/${newFreelancerService._id}`) 
            .set("Authorization", `Bearer ${token}`) 
            .send(updateData); 

        expect(res.status).to.equal(201);

        const updatedFreelancerService = await Freelancer_Service.findById(newFreelancerService._id);
        expect(updatedFreelancerService.hourly_rate).to.equal(6000);
    });

    it("should delete freelancer service by id", async function () {
        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        token = generateToken({ _id: newFreelancer._id, email: newFreelancer.email, role: newFreelancer.role });

        const newService = await Service.create({service_name: `service_${Date.now()}`});
        const newFreelancerService = await Freelancer_Service.create({hourly_rate: "1500", service_id: newService._id, freelancer_id: newFreelancer._id});

        const res = await request.delete(`/api/freelancer-service/${newFreelancerService._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(res.status).to.equal(200);
        const deletedFreelancerService = await Freelancer_Service.findById(newFreelancerService._id);
        expect(deletedFreelancerService).to.be.null;
    });
});