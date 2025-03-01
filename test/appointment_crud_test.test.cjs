const mongoose = require("mongoose");
const chai = require("chai");
const supertest = require("supertest");
const { app } = require("../app.js");
const Client = require('../model/Client');
const Freelancer = require("../model/Freelancer");
const Service = require("../model/Service.js");
const Appointment = require("../model/Appointment");
const Freelancer_Service = require("../model/Freelancer_Service");
const { generateToken } = require('./test_utils');

const request = supertest(app);
const expect = chai.expect;

let token;

after(async function () {
    await mongoose.disconnect();
});

describe("Appointment API Tests", function () {

    it("should create a new appointment", async function () {
        const newClient = await Client.create({ first_name: "John", last_name: "Doe", mobile_no: "9841309876", city: "Bhaktapur", email: "johndoe@gmail.com", password: "Johndoe@123", role: "client" });
        token = generateToken({ _id: newClient._id, email: newClient.email, role: newClient.role });
        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        const newService = await Service.create({ service_name: `service_${Date.now()}_${Math.random()}` });
        const newFreelancerService = await Freelancer_Service.create({hourly_rate: 1500, service_id: newService._id, freelancer_id: newFreelancer._id})

        const newAppointment = {
            appointment_purpose: "test purpose",
            appointment_date: "2025-03-24",
            project_duration: {
                unit: "month",
                value: 2
            },
            appointment_time: "11:20",
            freelancer_service_id: newFreelancerService._id,
            client_id: newClient._id
        }

        const res = await request
            .post("/api/appointment/")
            .set("Authorization", `Bearer ${token}`)
            .send(newAppointment);

        expect(res.status).to.equal(201);
        expect(res.body.appointment_purpose).to.equal("test purpose");
        expect(res.body.appointment_date).to.equal("2025-03-24T00:00:00.000Z");
        expect(res.body.freelancer_service_id).to.equal(newFreelancerService._id.toString());
        expect(res.body.client_id).to.equal(newClient._id.toString());
    });

    it("should fetch all appointments of a client", async function () {
        const newClient = await Client.create({ first_name: "John", last_name: "Doe", mobile_no: "9841309876", city: "Bhaktapur", email: "johndoe@gmail.com", password: "Johndoe@123", role: "client"});
        token = generateToken({ _id: newClient._id, email: newClient.email, role: newClient.role });

        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        const newService = await Service.create({ service_name: `service_${Date.now()}_${Math.random()}` });
        const newFreelancerService = await Freelancer_Service.create({hourly_rate: 1500, service_id: newService._id, freelancer_id: newFreelancer._id})
        const newAppointment = await Appointment.create({
            appointment_purpose: "test purpose",
            appointment_date: "2025-03-24",
            project_duration: {
                unit: "month",
                value: 2
            },
            appointment_time: "11:20",
            freelancer_service_id: newFreelancerService._id,
            client_id: newClient._id
        });

        const newFreelancer1 = await Freelancer.create({ first_name: "Billie", last_name: "Joel", date_of_birth: "1997-01-15", mobile_no: "9807978675", address: "Bagbazar", city: "Kathmandu", email: "billiejoel@gmail.com", password: "Billiejoel@123", role: "freelancer" });
        const newService1 = await Service.create({ service_name: `service_${Date.now()}_${Math.random()}` });
        const newFreelancerService1 = await Freelancer_Service.create({hourly_rate: 4500, service_id: newService1._id, freelancer_id: newFreelancer1._id})
        const newAppointment1 = await Appointment.create({
            appointment_purpose: "test purpose1",
            appointment_date: "2025-04-24",
            project_duration: {
                unit: "week",
                value: 2
            },
            freelancer_service_id: newFreelancerService1._id,
            client_id: newClient._id
        });
        
        const res = await request.get(`/api/appointment/client/${newClient._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0); 
    });

    it("should delete appointment by id", async function () {
        const newClient = await Client.create({ first_name: "John", last_name: "Doe", mobile_no: "9841309876", city: "Bhaktapur", email: "johndoe@gmail.com", password: "Johndoe@123", role: "client"});
        token = generateToken({ _id: newClient._id, email: newClient.email, role: newClient.role });

        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        const newService = await Service.create({ service_name: `service_${Date.now()}_${Math.random()}` });
        const newFreelancerService = await Freelancer_Service.create({hourly_rate: 1500, service_id: newService._id, freelancer_id: newFreelancer._id})
        const newAppointment = await Appointment.create({
            appointment_purpose: "test purpose",
            appointment_date: "2025-03-24",
            project_duration: {
                unit: "month",
                value: 2
            },
            appointment_time: "11:20",
            freelancer_service_id: newFreelancerService._id,
            client_id: newClient._id
        });

        const res = await request.delete(`/api/appointment/${newAppointment._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(res.status).to.equal(200);
        const deletedAppointment = await Appointment.findById(newAppointment._id);
        expect(deletedAppointment).to.be.null;
    });

    it("should update user by id", async function () {
        const newClient = await Client.create({ first_name: "John", last_name: "Doe", mobile_no: "9841309876", city: "Bhaktapur", email: "johndoe@gmail.com", password: "Johndoe@123", role: "client"});
        token = generateToken({ _id: newClient._id, email: newClient.email, role: newClient.role });

        const newFreelancer = await Freelancer.create({ first_name: "Sarah", last_name: "Jones", date_of_birth: "2001-01-15", mobile_no: "981830987", address: "New road", city: "Kathmandu", email: "sarahjones@gmail.com", password: "Sarahjones@123", role: "freelancer" });
        const newService = await Service.create({ service_name: `service_${Date.now()}_${Math.random()}` });
        const newFreelancerService = await Freelancer_Service.create({hourly_rate: 1500, service_id: newService._id, freelancer_id: newFreelancer._id})
        const newAppointment = await Appointment.create({
            appointment_purpose: "test purpose",
            appointment_date: "2025-03-24",
            project_duration: {
                unit: "month",
                value: 2
            },
            appointment_time: "11:20",
            freelancer_service_id: newFreelancerService._id,
            client_id: newClient._id
        });

        const updateData = {
            appointment_purpose: "Appointment purpose Updated",
        };

        const res = await request
            .put(`/api/appointment/${newAppointment._id}`) 
            .set("Authorization", `Bearer ${token}`) 
            .send(updateData); 

        expect(res.status).to.equal(201);

        const updatedAppointment = await Appointment.findById(newAppointment._id);
        expect(updatedAppointment.appointment_purpose).to.equal("Appointment purpose Updated");
    });
});