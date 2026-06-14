const { getConnection } = require("../database/connection");
const {
  fetchUsersQuery,
  createUserQuery,
  fetchUserQuery,
  fetchUserCredentialsQuery,
} = require("../common/constants");
const connection = getConnection();

async function login({ username, password }) {
  const user = await User.findOne({ username });

  // synchronously compare user entered password with hashed password
  if (bcrypt.compareSync(password, user.password)) {
    const token = auth.generateAccessToken(username);

    // call toJSON method applied during model instantiation
    return { ...user.toJSON(), token };
  }
}

const getUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query(fetchUsersQuery, (error, results) => {
      if (error) {
        reject({ message: error.message || error });
      } else {
        resolve({
          data: results.recordset,
        });
      }
    });
  });
};
const createUserService = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await isValidMail(payload.email);
      if (!res.data.exists) {
        let query = createUserQuery(payload);
        connection.query(query, (error, results) => {
          if (error) {
            reject({ message: error.message || error });
          } else {
            resolve({
              message: "User created successfully",
              name: payload.firstName,
            });
          }
        });
      } else {
        reject({ message: "User Already exists" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getUserByField = (field, value) => {
  let query = fetchUserQuery(field, value);
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject({ message: error.message || error });
      } else {
        if (results.recordset.length) {
          resolve({
            data: results.recordset[0],
          });
        } else {
          reject({
            message: "Invalid Email Id",
          });
        }
      }
    });
  });
};
const isValidUser = (payload) => {
  let query = fetchUserCredentialsQuery(payload);
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject({ message: error.message || error });
      } else {
        if (results.recordset.length) {
          resolve({
            data: results.recordset[0],
          });
        } else {
          reject({
            message: "Invalid User",
          });
        }
      }
    });
  });
};

const isValidMail = (email) => {
  let query = fetchUserQuery("email", email);
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject({ message: error.message || error });
      } else {
        const exists = results.recordset.length ? true : false;
        resolve({
          data: {
            exists,
          },
        });
      }
    });
  });
};

module.exports = {
  getUsers,
  getUserByField,
  createUserService,
  isValidMail,
  isValidUser,
};
