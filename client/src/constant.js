export const plans = [
  {
    id: 1,
    name: "Gold Basic",
    min: 100000,

    max: 1000000,
    percentage: [{ id: 1, data: 10 }],
    duration: [{ id: 1, data: "10% 6months", percent: 10, expire: 10 }],
  },
  {
    id: 2,
    name: "Platinum Executive",
    min: 5000000,
    max: 20000000,
    percentage: [
      { id: 1, data: 10 },
      { id: 2, data: 21 },
      { id: 3, data: 35 },
    ],
    duration: [
      { id: 1, data: "10% 6months", percent: 10, expire: 10 },
      { id: 2, data: "21% 12months", percent: 21, expire: 12 },
      { id: 3, data: "35% 18months", percent: 35, expire: 18 },
    ],
  },
  {
    id: 3,
    name: "Gold Executive",
    min: 1000000,
    max: 5000000,
    percentage: [
      { id: 1, data: 10 },
      { id: 2, data: 21 },
      { id: 3, data: 35 },
    ],
    duration: [
      { id: 1, data: "10% 6months", percent: 10, expire: 10 },
      { id: 2, data: "21% 12months", percent: 21, expire: 12 },
      { id: 3, data: "35% 18months", percent: 35, expire: 18 },
    ],
  },
];

export const identification = [
  "National ID",
  "International Passport",
  "Volters Card",
  "Driver's Liense",
  "Others",
];
