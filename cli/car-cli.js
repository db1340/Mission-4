const { MongoClient } = require('mongodb');
const prompt = require('prompt-sync')(); // For taking user input

// Connection URI for MongoDB Compass
const uri = 'mongodb://127.0.0.1:27017/Turners'; 

// Function to connect to MongoDB
async function connectToDatabase() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client.db();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}


// Function to add a new car
async function addCar(db) {
  const car = {
    carbrand: prompt('Enter car brand: '),
    cartype: prompt('Enter car type: '),
    caryear: prompt('Enter car year: '),
    carprice: prompt('Enter car price: '),
    carimage: prompt('Enter car image URL: '),
  };

  const result = await db.collection('cars').insertOne(car);
  console.log(`Car added with ID: ${result.insertedId}`);
}


// Function to find a car by brand, type, or year
async function findCar(db) {
  const criteria = {};
  console.log('Enter criteria to find a car:');
  criteria.carbrand = prompt('Car brand (leave empty if not searching by brand): ');
  criteria.cartype = prompt('Car type (leave empty if not searching by type): ');
  criteria.caryear = prompt('Car year (leave empty if not searching by year): ');

  // Remove empty criteria
  for (const key in criteria) {
    if (criteria[key] === '') {
      delete criteria[key];
    }
  }

  const car = await db.collection('cars').findOne(criteria);

  if (car) {
    console.log('Found car:', car);
  } else {
    console.log('Car not found.');
  }
}

// Function to update a car by brand, type, or year
async function updateCar(db) {
  const criteria = {};
  console.log('Enter criteria to update a car:');
  criteria.carbrand = prompt('Car brand (leave empty if not updating by brand): ');
  criteria.cartype = prompt('Car type (leave empty if not updating by type): ');
  criteria.caryear = prompt('Car year (leave empty if not updating by year): ');

  // Remove empty criteria
  for (const key in criteria) {
    if (criteria[key] === '') {
      delete criteria[key];
    }
  }

  const car = await db.collection('cars').findOne(criteria);
  if (!car) {
    console.log('Car not found.');
    return;
  }

  const updatedCar = {
    carbrand: prompt(`Enter new car brand (${car.carbrand}): `) || car.carbrand,
    cartype: prompt(`Enter new car type (${car.cartype}): `) || car.cartype,
    caryear: prompt(`Enter new car year (${car.caryear}): `) || car.caryear,
    carprice: prompt(`Enter new car price (${car.carprice}): `) || car.carprice,
    carimage: prompt(`Enter new car image URL (${car.carimage}): `) || car.carimage,
  };

  const result = await db.collection('cars').updateOne(criteria, { $set: updatedCar });
  console.log(`${result.modifiedCount} car updated.`);
}

// Function to list all cars with optional filtering
async function listCars(db) {
  const criteria = {};
  console.log('Enter criteria to list cars:');
  criteria.carbrand = prompt('Car brand (leave empty if not filtering by brand): ');
  criteria.cartype = prompt('Car type (leave empty if not filtering by type): ');
  criteria.caryear = prompt('Car year (leave empty if not filtering by year): ');

  // Remove empty criteria
  for (const key in criteria) {
    if (criteria[key] === '') {
      delete criteria[key];
    }
  }

  const cars = await db.collection('cars').find(criteria).toArray();
  console.log('List of cars:', cars);
}

// Function to delete a car by brand, type, or year
async function deleteCar(db) {
  const criteria = {};
  console.log('Enter criteria to delete a car:');
  criteria.carbrand = prompt('Car brand (leave empty if not deleting by brand): ');
  criteria.cartype = prompt('Car type (leave empty if not deleting by type): ');
  criteria.caryear = prompt('Car year (leave empty if not deleting by year): ');

  // Remove empty criteria
  for (const key in criteria) {
    if (criteria[key] === '') {
      delete criteria[key];
    }
  }

  const result = await db.collection('cars').deleteOne(criteria);
  console.log(`${result.deletedCount} car deleted.`);
}


// Main function
async function main() {
  const db = await connectToDatabase();

  while (true) {
    console.log('\nChoose an option:');
    console.log('1. Add Car');
    console.log('2. Find Car');
    console.log('3. Update Car');
    console.log('4. List Cars');
    console.log('5. Delete Car');
    console.log('0. Exit');

    const choice = prompt('Enter your choice: ');

    switch (choice) {
      case '1':
        await addCar(db);
        break;
      case '2':
        await findCar(db);
        break;
      case '3':
        await updateCar(db);
        break;
      case '4':
        await listCars(db);
        break;
      case '5':
        await deleteCar(db);
        break;
      case '0':
        console.log('Exiting...');
        process.exit(0);
      default:
        console.log('Invalid choice. Please try again.');
    }
  }
}

// Run the main function
main();
