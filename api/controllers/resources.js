const mongoose = require("mongoose");
const ResourceModel = require("../models/resource");

exports.resources_get_all = (req, res, next) => {
  ResourceModel.find()
    //.exec()
    .populate("tags", "name")
    .then((result) => {
      const response = {
        count: result.length,
        resources: result
          .map((resource) => ({
            _id: resource._id,
            title: resource.title,
            description: resource.description,
            tags: resource.tags.sort((a, b) => {
              if (a.name.toUpperCase() < b.name.toUpperCase()) {
                return -1;
              }
            }),
            iconUrl: resource.iconUrl || null,
            url: resource.url,
            request: {
              type: "GET",
              url: `http://localhost:3000/resources/${resource._id}`,
            },
          }))
          .reverse(),
      };
      if (result) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: "Requested resource ID does not exist." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.resources_get_specific_resource = (req, res, next) => {
  const id = req.params.resourceId;
  //const updateOperations = {};

  /* for (const operations of req.body) {
    updateOperations[operations.propName] = operations.value;
  } */

  ResourceModel.findOne({ _id: id })
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: "Requested resource ID does not exist." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.resources_create_resource = (req, res, next) => {
  const resource = new ResourceModel({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    iconUrl: req.body.iconUrl || null,
    url: req.body.url,
  });

  resource
    .save()
    .then((result) => {
      res.status(201).json({
        message: "✅ Resource created successfully ✅",
        createdResource: {
          _id: result._id,
          title: result.title,
          description: result.description,
          tags: result.tags,
          iconUrl: result.iconUrl || null,
          request: {
            type: "POST",
            url: `http://localhost:3000/resources/${result._id}`,
          },
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.resources_update_resource = (req, res, next) => {
  const id = req.params.resourceId;
  //const updateOperations = {};

  /* for (const operations of req.body) {
    updateOperations[operations.propName] = operations.value;
  } */

  ResourceModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } })
    .exec()
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json({ message: "✅ Resource updated successfully ✅" });
      } else {
        res
          .status(404)
          .json({ message: "⛔ Requested resource ID does not exist ⛔" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.resources_delete_resource = (req, res, next) => {
  const id = req.params.resourceId;
  ResourceModel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          ...result,
          message: "✅ Resource successfully deleted ✅",
        });
      } else {
        res.status(404).json({ message: "⛔ This resource does not exist ⛔" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
        message: "🤔 Something went wrong. Please, try it again later 🤔",
      });
    });
};
