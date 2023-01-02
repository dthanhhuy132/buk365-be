import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
const myJoiObjectId = JoiObjectId(Joi);

const valString = Joi.string().trim();
const valNumber = Joi.number().required();
const valId = myJoiObjectId().required();

const schemas = {
  postPayment: Joi.object({
    userId: myJoiObjectId(),
    totalMoney: valNumber,
    totalShip: valNumber,
    discountCode: valString,
    note: valString,
    paymentMethods:valString,
    listProduct: Joi.array().items(
      Joi.object({
        productId: valId,
        quantity: valNumber,
        productSelectColor: valString,
      })
    ),
    address: valString
  })
};

export default schemas;
