const users = [
  {
    username: "kajol@gmail.com",
    password: "kajol123"
  },
  {
    username: "tanay@gmail.com",
    password: "tanay123"
  }
];

const findUsername = (username) => {
  return users.find((user) => username === user.username);
};

export const fakeAuthApi = (username, password) => {
  return new Promise((resolve, reject) => {
    console.log("inside promise", username, password);

    setTimeout(() => {
      const user = findUsername(username);
      if (user && password === user.password) {
        console.log("condition true");
        resolve({ success: true, status: 200 });
      } else {
        reject({ success: false, status: 401 });
      }
    }, 2000);
  });
};
