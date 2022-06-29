const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getFundraisers(req, res);
        }

        case 'Post': {
            return addFundraiser(req, res);
        }

        case 'PUT': {
            return updateFundraiser(req, res);
        }

        case 'DELETE': {
            return deleteFundraiser(req, res);
        }
    }
}

async function addFundraiser(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('posts').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Post added successfully',
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
