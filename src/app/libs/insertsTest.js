const foodPlate = require("../models/FoodPlate");
const permission = require("../models/Permission");
const user = require("../models/User");
const restuarant = require("../models/Restaurant");
const section = require("../models/Section")

const createUsers = async () => {
    try {
        const countPermissions = await permission.estimatedDocumentCount();
        if (countPermissions < 1) return;

        const countUsers = await user.estimatedDocumentCount();
        if (countUsers > 0) return;

        const permissions = await permission.find();
        const permissionsIds = permissions.map((perm) => {
            return perm._id.toString();
        });
        const permissionManageMenu = permissions.find(
            (perm) => perm.name == "manage_menu"
        );

        const values = await Promise.all([
            new user({
                name: "Juan Pablo Solarte",
                email: "juan.jpsh17@gmail.com",
                password: await user.encryptPassword("Cont1234"),
                permissions: permissionsIds,
            }).save(),
            new user({
                name: "Natalia Andrea Medina",
                email: "nataliamed@unicauca.edu.co",
                password: await user.encryptPassword("Cont1234"),
                permissions: permissionManageMenu,
            }).save(),
        ]);

        console.info("************* Added Users *************");
        console.log(values);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

const createFoodPlates = async () => {
    try {
        const count = await foodPlate.estimatedDocumentCount();
        if (count > 0) return;

        let restaurants = (await restuarant.find()).map((res) => res.id.toString());
        let sections = (await section.find()).map((sec) => sec.id.toString())

        const values = await Promise.all([
            new foodPlate({
                name: "Lomo caracho",
                description: "100 gr de lomo caracho con ensalada de brocoli",
                image: "http://indianywok.weebly.com/uploads/5/0/6/7/50670067/s589705927513296688_p10_i1_w450.jpeg",
                price: 40000,
                idRestaurant: restaurants[0],
                sections: [sections[1]]
            }).save(),
            new foodPlate({
                name: "Hamburguesa doble carne",
                description:
                    "Hammburguesa con doble carne Angus acompañada de papas a la francesa",
                image: "https://cuponassets.cuponatic-latam.com/backendCo/uploads/imagenes_descuentos/186268/cd4e98329a4bae0c65ef151283f2acc82b318c8d.XL2.jpg",
                price: 35000,
                idRestaurant: restaurants[0],
                sections: [sections[0]]
            }).save(),
            new foodPlate({
                name: "Mazorcada especial",
                description:
                    "Maiz tierno desgranado acompañado con trozos de carne y queso gratinado",
                image: "https://uploads.candelaestereo.com/1/2021/08/como-hacer-una-mazorcada-la-manera-mas-facil-destacada.jpg",
                price: 30000,
                idRestaurant: restaurants[0],
                sections: [sections[2]],
            }).save(),
        ]);

        console.info("************* Added Food Plates *************");
        console.log(values);
    } catch (error) {
        console.log(error.message);
    }
};

const createRestaurants = async () => {
    try {
        const count = await restuarant.estimatedDocumentCount();
        if (count > 0) return;

        let owner = (
            await user.findOne({ email: "juan.jpsh17@gmail.com" })
        ).id.toString();
        let manager = (
            await user.findOne({ email: "nataliamed@unicauca.edu.co" })
        ).id.toString();

        const values = await Promise.all([
            new restuarant({
                name: "Leños al carbon",
                owner: [owner],
                staff: [owner, manager],
                image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/elle-restaurantes-decoracion-bonita-instagram-raimunda-madrid-1573068471.jpg",
            }).save(),
            new restuarant({
                name: "Corona",
                owner: [owner],
                staff: [owner, manager],
                image: "https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/2K7FHLJP75FGRO2LKQMCFKFKWA.jpg",
            }).save(),
            new restuarant({
                name: "VIP",
                owner: [owner],
                staff: [owner],
                image: "https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/2K7FHLJP75FGRO2LKQMCFKFKWA.jpg",
            }).save(),
        ]);

        console.info("************* Added Restaurants *************");
        console.log(values);
    } catch (error) {
        console.log(error.message);
    }
};

const createSections = async () => {
    try {
        const count = await section.estimatedDocumentCount();
        if (count > 0) return;

        let restaurants = (await restuarant.find()).map((res) => res.id.toString());

        const values = await Promise.all([
            new section({
                name: "Hamburguesas",
                idRestaurant: restaurants[0]
            }).save(),
            new section({
                name: "Carnes",
                idRestaurant: restaurants[0]
            }).save(),
            new section({
                name: "Mazorcadas",
                idRestaurant: restaurants[0]
            }).save(),
        ]);

        console.info("************* Added Sections *************");
        console.log(values);
    } catch (error) {
        console.log(error.message);
    }
};

const executeInserts = async () => {
    await createUsers();
    await createRestaurants();
    await createSections();
    await createFoodPlates();
};

executeInserts();
