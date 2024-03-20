import mongoose from 'mongoose';

// Plugins
import toJSON from './plugins/index';

const apartmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the apartment']
    },
    address: {
      type: String,
      required: [true, 'Please provide the address of the apartment']
    }
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
apartmentSchema.plugin(toJSON);

const Apartment = mongoose.model('Apartment', apartmentSchema);

export default Apartment;
