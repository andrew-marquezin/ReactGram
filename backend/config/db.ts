import mongooose from "mongoose";

const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;

const conn = async () => {
  try {
    const dbConn = await mongooose.connect(
      `mongodb+srv://${dbuser}:${dbpassword}@cluster0.roxlanf.mongodb.net/?appName=Cluster0`,
    );

    console.log("MongoDB connected!");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

export default conn;
