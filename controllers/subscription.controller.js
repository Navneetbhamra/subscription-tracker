import Subscription from '../models/subscription.model.js';
import workflowRouter from '../routes/workflow.routes.js';
import { workflowClient } from '../config/upstash.js';

export const createSubscription = async (req, res, next) =>{
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${process.env.SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id
            },

            Headers: {
                'content-type': 'application/json'
            },
            
            retries: 0
        })

        res.status(201).json({success: true, data:{ subscription, workflowRunId } });
    }
    catch(e){
        next(e);
    }
}

export const getUserSubscription = async(req, res, next) => {
    try{
        //check if the user is the smae as the one in the token
        if(req.user.id !== req.params.id){
            const error = new error('You are not the owner of this account');
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.id});

        res.status(200).json({success: true, data: subscriptions});
    }
    catch(e){
        next(e);
    }
}
