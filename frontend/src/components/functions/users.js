import axios from "axios";

export const listUser = async (authtoken) => {
  return await axios.get("http://localhost:4200/api/users", {
    headers: {
      authtoken,
    },
  });
};

export const changeRole = async (authtoken, values) => {
  console.log('cahan', values);
  return await axios.post("http://localhost:4200/api/change-role",
    values
    , {
      headers: {
        authtoken,
      },
    });
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete("http://localhost:4200/api/users/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const updateUser = async (authtoken, id, values) => {
  console.log('reset', id, values);
  return await axios.put("http://localhost:4200/api/users/" + id, values, {
    headers: {
      authtoken,
    },
  });
};