const mongoose = require("mongoose");
const TagModel = require("../models/tag");

exports.tags_get_all = (req, res, next) => {
  TagModel.find()
    .exec()
    .then((result) => {
      const response = {
        count: result.length,
        tags: result
          .map((tag) => ({
            _id: tag._id,
            name: tag.name,
            request: {
              type: "GET",
              url: `http://localhost:3000/tags/${tag._id}`,
            },
          }))
          .sort((a, b) => {
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
              return -1;
            }
          }),
      };
      if (result) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Requested tag ID does not exist." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.tags_create_tag = (req, res, next) => {
  const tag = new TagModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });

  tag
    .save()
    .then((result) => {
      res.status(201).json({
        message: "✅ Tag created successfully ✅",
        createdTag: {
          _id: result._id,
          name: result.name,
          request: {
            type: "POST",
            url: `http://localhost:3000/tags/${result._id}`,
          },
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.tags_update_tag = (req, res, next) => {
  const id = req.params.tagId;
  //const updateOperations = {};

  /* for (const operations of req.body) {
    updateOperations[operations.propName] = operations.value;
  } */

  TagModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } })
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "✅ Tag updated successfully ✅" });
      } else {
        res
          .status(404)
          .json({ message: "⛔ Requested tag ID does not exist ⛔" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.tags_delete_tag = (req, res, next) => {
  const id = req.params.tagId;
  let tagName;
  TagModel.findOne({ _id: id })
    .exec()
    .then((result) => {
      tagName = result.name;
    })
    .then(() => {
      TagModel.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          if (result) {
            res.status(200).json({
              ...result,
              message: `✅ Tag "${tagName}" was deleted ✅`,
            });
          } else {
            res
              .status(404)
              .json({ message: "⛔ Requested tag ID does not exist ⛔" });
          }
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    });
};
