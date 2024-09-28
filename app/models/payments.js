const { Schema, model } = require("mongoose");

const PaymentSchema = new Schema({}, { timeseries: true });

const PaymentModel = model("user", PaymentSchema);

module.exports = PaymentModel;
