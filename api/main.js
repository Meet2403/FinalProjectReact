const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const { ApolloServer, gql } = require("apollo-server-express");
const path = require("path");

const fs = require("fs");
const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

let db;

const dbURL =
  "mongodb+srv://joshidhiren07:DhirenAssignment1@cluster0.hcfcygm.mongodb.net/";

async function getDB() {
  const mongodbClient = new MongoClient(dbURL);
  await mongodbClient.connect();
  console.log(`Connected to MongoDB!`);
  db = mongodbClient.db("UserModel");
  return db;
}

const empSchema = gql(fs.readFileSync('./graphqlSchema', 'utf-8'));

const resolvers = {
  Query: {
    getAllEmployees,
    getEmployeeByType,
    getEmployeeById,
  },
  Mutation: {
    addNewEmployee,
    editEmployee,
    deleteEmployee,
  },
};

async function getAllEmployees() {
  const employees = await db.collection("employeeTable").find({}).toArray();
  return employees;
}

async function getEmployeeByType(_, { employeeType }) {
  const employees = await db.collection("employeeTable").find({ employeeType: employeeType }).toArray();
  return employees;
}

async function getEmployeeById(_, { _id }) {

  const employee = await db.collection("employeeTable").findOne({ _id: new ObjectId(_id) });;
  return employee;
}

async function addNewEmployee(_, { employee }) {
  const response = await db.collection("employeeTable").insertOne(employee);
  const displayNewEmp = await db
    .collection("employeeTable")
    .findOne({ _id: response.insertedId });
  return displayNewEmp;
}

async function editEmployee(_, { _id, employee }) {
  const editedEmployee = (await db.collection("employeeTable").findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: employee }))
  return editedEmployee;
}

async function deleteEmployee(_, { _id }) {
  const response = await db.collection("employeeTable").findOneAndDelete({ _id: new ObjectId(_id) });
  return response
}

const server = new ApolloServer({ typeDefs: empSchema, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql" });
  getDB();
});

app.listen(8000, () => {
  console.log(`Server running on port 8000!`);
});
