import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLenght: 2,
        maxLength: 100,
    },

    price:{
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than 0'],
    },

    currency:{
        type: String,
        enum: ['INR', 'USD', 'EUR'],
        default: 'INR'
    },
    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category:{
        type: String,
        enum: ['entertainment', 'sports', 'news', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true
    },
    paymentMethod:{
        type: String,
        trim: true,
        reqiured: true
    },
    status:{
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active' 
    },
    startDate:{
        type: Date,
        required: true,
        validate: {
            validator:(value) => value <= new Date(),
            message: 'Start date must be in the past'
        }
    },
    renewalDate:{
        type: Date,
        validate: {
            validator: function (value) {
                value > this.startDate();
            },
            message: 'Renewal date must be after start date'}
        },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reqiured: true,
        index: true,
    }


}, {timestamps: true});

// auto-calculate renewal date if missing
subscriptionSchema.pre('save', function() {
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //auto-update the status if the renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;