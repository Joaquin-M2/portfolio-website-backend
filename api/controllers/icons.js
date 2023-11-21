const mongoose = require("mongoose");
const IconModel = require("../models/icon");

exports.icons_get_all = (req, res, next) => {
  IconModel.find()
    .exec()
    .then((result) => {
      const response = {
        count: result.length,
        icons: result
          .map((icon) => ({
            _id: icon._id,
            name: icon.name,
            url: icon.url,
            request: {
              type: "GET",
              url: `http://localhost:3000/icons/${icon._id}`,
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
        res.status(404).json({ message: "Requested icon ID does not exist." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.icons_create_icon = (req, res, next) => {
  const icon = new IconModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    url: req.body.url,
  });

  IconModel.find()
    .exec()
    .then((result) => {
      if (
        !result.some(
          (icon) => icon.name.toLowerCase() === req.body.name.toLowerCase()
        )
      ) {
        icon
          .save()
          .then((result) => {
            res.status(201).json({
              message: "✅ Icon created successfully ✅",
              createdIcon: {
                _id: result._id,
                name: result.name,
                url: result.url,
                request: {
                  type: "POST",
                  url: `http://localhost:3000/icons/${result._id}`,
                },
              },
            });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        res
          .status(409)
          .json({ message: "⛔ An icon with that name already exists ⛔" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.icons_update_icon = (req, res, next) => {
  const id = req.params.iconId;

  IconModel.find()
    .exec()
    .then((result) => {
      const iconToUpdate = result.find((icon) => icon._id.toString() === id);
      if (
        iconToUpdate.name.toLowerCase() !== req.body.name.toLowerCase() ||
        iconToUpdate.url.toLowerCase() !== req.body.url.toLowerCase()
      ) {
        IconModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } })
          .exec()
          .then((result) => {
            if (result) {
              res.status(200).json({
                message: `✅ Icon "${req.body.name}" updated successfully ✅`,
              });
            } else {
              res
                .status(404)
                .json({ message: "⛔ Requested icon ID does not exist ⛔" });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        res.status(409).json({
          message: "⛔ An icon with that name and url already exists ⛔",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.icons_delete_icon = (req, res, next) => {
  const id = req.params.iconId;
  let iconName;
  IconModel.findOne({ _id: id })
    .exec()
    .then((result) => {
      iconName = result.name;
    })
    .then(() => {
      IconModel.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          if (result) {
            res.status(200).json({
              ...result,
              message: `✅ Icon "${iconName}" was deleted ✅`,
            });
          } else {
            res
              .status(404)
              .json({ message: "⛔ Requested icon ID does not exist ⛔" });
          }
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    });
};
