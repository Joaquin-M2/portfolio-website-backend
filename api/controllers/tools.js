const mongoose = require("mongoose");
const ToolModel = require("../models/tool");

exports.tools_get_all = (req, res, next) => {
  ToolModel.find()
    //.exec()
    .populate("tags", "name")
    .then((result) => {
      const response = {
        count: result.length,
        tools: result
          .map((tool) => ({
            _id: tool._id,
            title: tool.title,
            description: tool.description,
            tags: tool.tags.sort((a, b) => {
              if (a.name.toUpperCase() < b.name.toUpperCase()) {
                return -1;
              }
            }),
            iconUrl: tool.iconUrl || null,
            url: tool.url,
            request: {
              type: "GET",
              url: `http://localhost:3000/tools/${tool._id}`,
            },
          }))
          .reverse(),
      };
      if (result) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Requested tool ID does not exist." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.tools_get_specific_tool = (req, res, next) => {
  const id = req.params.toolId;
  //const updateOperations = {};

  /* for (const operations of req.body) {
    updateOperations[operations.propName] = operations.value;
  } */

  ToolModel.findOne({ _id: id })
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Requested tool ID does not exist." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.tools_create_tool = (req, res, next) => {
  const tool = new ToolModel({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    iconUrl: req.body.iconUrl || null,
    url: req.body.url,
  });

  tool
    .save()
    .then((result) => {
      res.status(201).json({
        message: "✅ Tool created successfully ✅",
        createdTool: {
          _id: result._id,
          title: result.title,
          description: result.description,
          tags: result.tags,
          iconUrl: result.iconUrl || null,
          request: {
            type: "POST",
            url: `http://localhost:3000/tools/${result._id}`,
          },
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.tools_update_tool = (req, res, next) => {
  const id = req.params.toolId;
  //const updateOperations = {};

  /* for (const operations of req.body) {
    updateOperations[operations.propName] = operations.value;
  } */

  ToolModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } })
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "✅ Tool updated successfully ✅" });
      } else {
        res
          .status(404)
          .json({ message: "⛔ Requested tool ID does not exist ⛔" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.tools_delete_tool = (req, res, next) => {
  const id = req.params.toolId;
  ToolModel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          ...result,
          message: "✅ Tool successfully deleted ✅",
        });
      } else {
        res.status(404).json({ message: "⛔ This tool does not exist ⛔" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
        message: "🤔 Something went wrong. Please, try it again later 🤔",
      });
    });
};
