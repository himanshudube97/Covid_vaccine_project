import Centres from "../models/covidCenters.js";
import Slots from "../models/vaccineSlot.js";
import Errorhandler from "../utils/errorhandler.js";

export const createCentre = async (req, res, next) => {
  try {
    let result = await Centres.create(req.body);

    if (!result) return next(new Errorhandler("No Result found", 400));

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// register user-

export const registerSlot = async (req, res, next) => {
  req.body.userId = req.user._id;
  try {
    const { userId, centreId } = req.body;

    const alreadyBooked = await Slots.findOne({ userId: userId, isRegistered: true });
    if (alreadyBooked) return next(new Errorhandler("Already Booked", 400));

    const result =await Centres.findOneAndUpdate(
      { userId: userId, centreId: centreId },
      { isRegistered: true },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
}

export const getAvailableSlots = async(req, res, next) =>{

  try {
    console.log("brot")
      const result  = await Slots.aggregate([
        {$match: {isBooked: false}},
        // {$group: {centreId: "centreId", availableSlots: {$sum: 1}}},
        // {$lookup: {
        //   from: "Centres",
        //   localField: "centreId",
        //   foreignField: "_id",
        //   as: "centreInfo"
        // }}
      ])
      console.log("himans")
      if(!result) return next(new Errorhandler("none", 400));
      res.status(200).json({
        success: true,
        result,
      });
  } catch (error) {
    next(error)
  }
}



export const deleteCentre = async (req, res, next) => {
  const { centreId } = req.query;
  try {
    let result = await Centres.findOneAndDelete({ id: centreId });
    res.status(200).json({
      success: true,
      result,
    });
    res.st
  } catch (error) {
    next(error);
  }
}













export const getAllBlogs = async (req, res, next) => {
  try {
    let searchData = req.query.search
    let sortLikes = Number(req.query.likes);
    let sortViews = Number(req.query.views);
    let sortData = Number(req.query.sort) || -1;
    let pageNum = Number(req.query.page) || 1;

    console.log(req.query, "query");

    // let sortDataQuery = {
    //   createdAt: sortData,
    // };

    // if (sortLikes) {
    //   sortDataQuery = { noOfLikes: sortLikes, ...sortDataQuery } ;
    // } else if (sortViews) {
    //   sortDataQuery = { noOfViews: sortViews, ...sortDataQuery };
    // }

    const sortDataQuery = {
      ...(sortLikes ? { noOfLikes: sortLikes } : {}),
      ...(sortViews ? { noOfViews: sortViews } : {}),
      createdAt: sortData,
    };

    console.log(sortDataQuery, "sorquer");

    let searchQuery = [
      {
        title: { $regex: searchData, $options: "i" },
      },
      {
        authorName: { $regex: searchData, $options: "i" },
      },
      {
        description: { $regex: searchData, $options: "i" },
      },
    ];
    console.log(searchQuery, "query");

    let query = {
      isDeleted: false,
      $or: searchQuery,
    };

    let result = await Blog.aggregate([
      { $match: query },
      { $sort: sortDataQuery },
      {
        $facet: {
          metadata: [
            { $count: "totalBlogs" },
            {
              $addFields: {
                current_page: pageNum,
                total_page: { $ceil: { $divide: ["$totalBlogs", 5] } },
              },
            },
          ],
          data: [{ $skip: (pageNum - 1) * 5 }, { $limit: 10 }],
        },
      },
    ]);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleBlog = async (req, res, next) => {
  try {
    let blogId = req.params.id;
    let result = await Blog.findOneAndUpdate(
      { _id: blogId, isDeleted: false },
      { $inc: { noOfViews: 1 } },
      { new: true }
    );

    if (!result) return next(new Errorhandler("No Result found", 400));

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { findQuery, updateQuery } = req.body;

    if (!findQuery || !updateQuery)
      return next(new Errorhandler("Bad request", 400));

    req.body.findQuery.userId = req.user._id; //jisne banaya wahi update kar sakta hai.

    let result = await Blog.findOneAndUpdate(findQuery, updateQuery, {
      new: true,
      upsert: false,
    });

    if (!result) return next(new Errorhandler("Not found"), 400);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    if (!req.body.findQuery) return next(new Errorhandler("No findQuery", 400));

    req.body.findQuery.userId = req.user._id; //jisne banaya wahi delete kar sakta hai.

    let result = await Blog.findOneAndUpdate(
      req.body.findQuery,
      { isDeleted: true },
      { new: true, upsert: false }
    );
    console.log(result, "result");

    if (!result) return next(new Errorhandler("Not Found", 400));

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// Create comment
export const createComment = async (req, res, next) => {
  2
  try {
    req.body.comment.userId = req.user._id;

    let blog = await Blog.findOne({ _id: req.body.blogId, isDeleted: false });

    if (!blog) return next(new Errorhandler("Invalid id", 404));

    let commentsArray = [...blog.comments];

    let indexOfComment = commentsArray.findIndex((val) => {
      return val.userId.toString() === req.user._id.toString();
    });

    indexOfComment === -1
      ? commentsArray.push(req.body.comment)
      : (commentsArray[indexOfComment] = req.body.comment);

    let result = await Blog.findOneAndUpdate(
      { _id: req.body.blogId, isDeleted: false },
      { comments: commentsArray },
      { new: true }
    );

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

//delete comment->

export const deletecomment = async (req, res, next) => {
  try {
    let result = await Blog.updateOne(
      { _id: req.body.blogId, isDeleted: false },
      { $pull: { comments: { userId: req.user._id } } }
    );
    console.log(result, "res");

    if (!result || result.modifiedCount === 0)
      return next(new Errorhandler("Bad", 400));

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

//like blog->

export const like_dislike_blog = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    const blog = await Blog.findOne({ _id: req.body.blogId, isDeleted: false });

    let likesArray = [...blog.likes];

    const likeIndex = likesArray.findIndex((val) => {
      return val.toString() === req.body.userId.toString();
    });

    likeIndex === -1
      ? likesArray.push(req.body.userId)
      : likesArray.splice(likeIndex, 1);

    let noOfLikes = likesArray.length;

    let result = await Blog.findOneAndUpdate(
      { _id: req.body.blogId, isDeleted: false },
      { likes: likesArray, noOfLikes: noOfLikes },
      { new: true }
    );
    if (!result) return;

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// export const optimizedLikeAndUnlike = async (req, res, next) => {
//   console.log(req.body);
//   console.log(req.user._id);
//   try {
//     let updateQuery = {
//       like: { $addToSet: { likes: req.user._id } },
//       unlike: { $pull: { likes: req.user._id } },
//     };

//     let result = await Blog.findOneAndUpdate(
//       { _id: req.body.blogId },
//       updateQuery[req.body.likeAction],
//       { new: true }
//     );
//     console.log(result, "res");
//     if (!result) return next(new Errorhandler("error is thrown", 400));

//     res.status(200).json({ success: true, result });
//   } catch (error) {
//     next(error);
//   }
// };
