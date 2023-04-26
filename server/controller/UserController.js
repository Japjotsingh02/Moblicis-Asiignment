const userModel = require("../models/UserModel");

const UsersIncomeCarFilter=async (req,res)=>{
    try{
        let {income,car}=req.body;

        const users=await userModel.find({
            $and: [
              {income: { $lte: income }},
              {car: { $in: car }}
            ]
        });

        if(users){
            return res.json({
                message:"data sent successfully",
                data:users,
            })
        }
        else{
            return res.status(404).json({
                message:"data not found",
            });
        }
    }
    catch(err){
        return res.json({
            message:err.message,
        });
    }
};

const UsersPhPriceFilter=async(req,res)=>{
    try{
        let {gender,phone_price}=req.body;

        const users=await userModel.find({
            $and: [
                {gender: gender},
                {phone_price: { $gte: phone_price}},
            ]
        });

        if(users){
            return res.json({
                message:"data sent successfully",
                data:users,
            })
        }
        else{
            return res.status(404).json({
                message:"data not found",
            });
        }
    }
    catch(err){
        return res.json({
            message:err.message,
        });
    }
}

const UserslNameEmailFilter=async (req,res)=>{
    try{
        let {startsWith}=req.body;

        // const users=await userModel.find({
        //     $and: [
        //       {last_name: { $regex: `^${startsWith}`}},
        //       {email: { $regex:'$last_name'}}
        //     ]
        // });

        const users = await userModel.aggregate([
			{
				$addFields: {
					includeslName: { $regexMatch: { input: "$email", regex: "$last_name", options: "i" } },
                    quoteLen:{$gt:[{$strLenCP:'$quote'},15]}
				},
			},
			{
				$match: {
                    last_name: { $regex: `^${startsWith}`},
					includeslName: true,
                    quoteLen:true
				},
			},
			{
				$project: {
					includeslName: false,
                    quoteLen:false
				},
			},
		]);
            
        if(users){
            return res.json({
                message:"data sent successfully",
                data:users,
            })
        }
        else{
            return res.status(404).json({
                message:"data not found",
            });
        }
    }
    catch(err){
        return res.json({
            message:err.message,
        });
    }
};

const CarEmailFilter=async (req,res)=>{
    try{
        let {car}=req.body;

        const users=await userModel.find({
            $and: [
              {car: { $in: car }},
              {email:{$not:/1|2|3|4|5|6|7|8|9|0/}}
            ]
        })

        if(users){
            return res.json({
                message:"data sent successfully",
                data:users,
            })
        }
        else{
            return res.status(404).json({
                message:"data not found",
            });
        }
    }
    catch(err){
        return res.json({
            message:err.message,
        });
    }
};

const getTop10Cities=async(req,res)=>{
    try{
        const cities=await userModel.aggregate([
            {
                $group:{
                    _id:'$city',
                    count:{$sum:1},
                    avgIncome:{$avg:'$income'}
                }
            },
            {
                $sort: {
                    count:-1,
                }
            },{
                $limit: 10,
            }
        ]);

        if(cities){
            return res.json({
                message:"data sent successfully",
                data:cities,
            })
        }
        else{
            return res.status(404).json({
                message:"data not found",
            });
        }
    }
    catch(err){
        return res.json({
            message:err.message,
        });
    }
}

module.exports={
    UsersIncomeCarFilter,
    UsersPhPriceFilter,
    UserslNameEmailFilter,
    CarEmailFilter,
    getTop10Cities
}