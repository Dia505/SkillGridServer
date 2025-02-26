const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../app');  // Make sure this path is correct for your app.js
const Client = require('../model/Client');  // Make sure this path is correct

describe('CRUD operations for Users', function () {
    let mongoServer;
    let chai;
    let expect;
    let chaiHttp;

    before(async () => {
        // Dynamically import chai and extract expect
        const chaiModule = await import('chai');
        chai = chaiModule.default;
        expect = chaiModule.expect;

        // Dynamically import chai-http
        const chaiHttpModule = await import('chai-http');
        chaiHttp = chaiHttpModule.default;

        chai.use(chaiHttp);

        // Start the in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        // Connect to the in-memory database
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterEach(async () => {
        await Client.deleteMany({});
    });

    after(async () => {
        // Disconnect from the in-memory database and stop the MongoDB server
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should create a new client', async function () {
        const newClient = { 
            first_name: 'John', 
            last_name: "Doe", 
            mobile_no: "9818223344", 
            city: "Kathmandu", 
            email: "johndoe@gmail.com", 
            password: "Johndoe@123" 
        };
        const res = await chai.request(app)
            .post('/client')
            .send(newClient);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('first_name').eql(newClient.first_name);
        expect(res.body).to.have.property('last_name').eql(newClient.last_name);
        expect(res.body).to.have.property('mobile_no').eql(newClient.mobile_no);
        expect(res.body).to.have.property('city').eql(newClient.city);
        expect(res.body).to.have.property('email').eql(newClient.email);
        expect(res.body).to.have.property('password').eql(newClient.password);
    });

    it('should retrieve all clients', async function () {
        // Insert some users
        await Client.create({ 
            first_name: 'Jane', 
            last_name: "Doe", 
            mobile_no: "9869774352", 
            city: "Chitwan", 
            email: "janedoe@gmail.com", 
            password: "Janedoe@123" 
        });
        await Client.create({ 
            first_name: 'Bob', 
            last_name: "Smith", 
            mobile_no: "9871665676", 
            city: "Bhaktapur", 
            email: "bobsmith@gmail.com", 
            password: "Bobsmith@123" 
        });

        const res = await chai.request(app).get('/client');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').that.is.not.empty;
        expect(res.body).to.have.property('first_name');
        expect(res.body).to.have.property('last_name');
        expect(res.body).to.have.property('mobile_no');
        expect(res.body).to.have.property('city');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('password');
    });

    it('should update an existing client', async () => {
        const clientData = { 
            first_name: 'Jane', 
            last_name: "Doe", 
            mobile_no: "9869774352", 
            city: "Chitwan", 
            email: "janedoe@gmail.com", 
            password: "Janedoe@123" 
        };
        const newClient = await Client.create(clientData);

        const updatedClient = await Client.findByIdAndUpdate(newClient._id, { first_name: 'Charity' }, { new: true });

        expect(updatedClient.first_name).to.equal('Charity');
        expect(updatedClient.email).to.equal(clientData.email);
    });

    it('should delete a client', async function () {
        // Create a user
        const clientData = { 
            first_name: 'Gary', 
            last_name: "Anderson", 
            mobile_no: "9851483746", 
            city: "Chitwan", 
            email: "garyanderson@gmail.com", 
            password: "Geryanderson@123" 
        };

        const newClient = await Client.create(clientData);

        await Client.findByIdAndDelete(newClient._id);

        const deletedClient = await Client.findById(newClient._id);
        expect(deletedClient).to.be.null;
    });
});
