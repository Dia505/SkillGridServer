const mongoose = require("mongoose");
const chai = require("chai");
const supertest = require("supertest");
const { app } = require("../app.js");
const Freelancer = require('../model/Freelancer');
const Education = require("../model/Education");
const { generateToken } = require('./test_utils');

const request = supertest(app);
const expect = chai.expect;

let token;

after(async function () {
    await mongoose.disconnect();
});

describe("Education API Tests", function () {
    it("should create a new education", async function () {
        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        token = generateToken({ _id: newFreelancer._id, email: newFreelancer.email, role: newFreelancer.role });

        const newEducation = {
            degree_title: "test degree",
            institution_name: "test institution",
            start_date: "2016-03-24",
            end_date: "2018-03-24",
            freelancer_id: newFreelancer._id
        }

        const res = await request
            .post("/api/education/")
            .set("Authorization", `Bearer ${token}`)
            .send(newEducation);

        expect(res.status).to.equal(201);
    });

    it("should fetch all education of a freelancer", async function () {
        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        token = generateToken({ _id: newFreelancer._id, email: newFreelancer.email, role: newFreelancer.role });

        const newEducation1 = await Education.create({degree_title: "test degree", institution_name: "test institution", start_date: "2016-03-24", end_date: "2018-03-24", freelancer_id: newFreelancer._id});
        const newEducation2 = await Education.create({degree_title: "test degree2", institution_name: "test institution2", start_date: "2018-03-24", end_date: "2020-03-24", freelancer_id: newFreelancer._id});

        const res = await request.get(`/api/education/freelancer/${newFreelancer._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0); 
    });

    it("should update education by id", async function () {
        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        token = generateToken({ _id: newFreelancer._id, email: newFreelancer.email, role: newFreelancer.role });

        const newEducation = await Education.create({degree_title: "test degree", institution_name: "test institution", start_date: "2016-03-24", end_date: "2018-03-24", freelancer_id: newFreelancer._id});

        const updateData = {
            degree_title: "degree Updated",
            institution_name: "institution Updated",
        };

        const res = await request
            .put(`/api/education/${newEducation._id}`) 
            .set("Authorization", `Bearer ${token}`) 
            .send(updateData); 

        expect(res.status).to.equal(201);

        const updatedEducation = await Education.findById(newEducation._id);
        expect(updatedEducation.degree_title).to.equal("degree Updated");
        expect(updatedEducation.institution_name).to.equal("institution Updated");
    });

    it("should delete education by id", async function () {
        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        token = generateToken({ _id: newFreelancer._id, email: newFreelancer.email, role: newFreelancer.role });

        const newEducation = await Education.create({degree_title: "test degree", institution_name: "test institution", start_date: "2016-03-24", end_date: "2018-03-24", freelancer_id: newFreelancer._id});

        const res = await request.delete(`/api/education/${newEducation._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(res.status).to.equal(200);
        const deletedEducation = await Education.findById(newEducation._id);
        expect(deletedEducation).to.be.null;
    });
});
