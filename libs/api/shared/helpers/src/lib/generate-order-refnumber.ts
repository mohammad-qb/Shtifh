export const generateOrderRefNumber = () => {
   return `SH101-${Math.floor(Math.random() * 90000000) + 10000000}`;
};
