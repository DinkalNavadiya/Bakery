import Bills from "../../Modal/Bill.js";
const Bill = {
    Query: {
        Bills: async (root, args) => {
            const bills = await Bills.find();
            return bills;
        },
        getBills: async (root, args) => {
            const bills = await Bills.findById(args.id);
            return bills;
        },
    }
};

export default Bill;

