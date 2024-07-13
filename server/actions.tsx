"use server";

const getUser = async (id: string) => {
  return { id: 1, name: "John Doe" };
};

const getPayments = async (id: string) => {
  return  [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
  ];
};

