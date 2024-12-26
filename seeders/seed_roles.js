const connectDb = require("../config/db");
const Role = require("../model/Role");

const seedRoles = async () => {
    try {
        await connectDb(); 

        const roles = ["admin", "client", "freelancer"];
        for (const role of roles) {
            const exists = await Role.findOne({ role_name: role });
            if (!exists) {
                await Role.create({ role_name: role });
            }
        }
        console.log("Roles seeded successfully");
        process.exit(0); // Exit the script
    } 
    catch (err) {
        console.error(err);
        process.exit(1); // Exit the script with error
    }
};

seedRoles();
