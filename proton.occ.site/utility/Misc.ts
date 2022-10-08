import { round } from "mathjs";

const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const calculateAPR = (amount: number, apr: number, month: number) => {
  console.log(+amount, +apr, +month);
  return round((+amount * +apr * +month) / 12 / 100, 2);
};

export default {
  numberWithCommas,
  calculateAPR,
};
