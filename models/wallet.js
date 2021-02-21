const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WITHDRAW = 'WITHDRAW';
const DEPOSIT = 'DEPOSIT';
const APPROVED = 'APPROVED';
const PENDING = 'PENDING';
const REJECTED = 'REJECTED';

const TYPES = [WITHDRAW, DEPOSIT];
const STATUS = [APPROVED, PENDING, REJECTED];

const walletSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  credit: {
    type: Number,
    required: true,
    default: 0,
  },
  records: [
    {
      amount: {
        type: Number,
        required: true,
        default: 0,
      },
      type: {
        type: String,
        enum: TYPES,
        required: true,
      },
      status: {
        type: String,
        enum: STATUS,
        default: 'PENDING',
        required: true,
      },
    },
  ],
});

walletSchema.methods.addRecord = function (amount, type, status = STATUS) {
  this.records.push({
    amount: amount,
    type: type,
    status: status,
  });

  this.credit = this.credit + (type === WITHDRAW ? -amount : amount);
  return this.save();
};

exports.enums = {
  WITHDRAW,
  DEPOSIT,
  APPROVED,
  PENDING,
  REJECTED,
};

module.exports = mongoose.model('Wallet', walletSchema);
