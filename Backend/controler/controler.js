const { Mongoose, default: mongoose } = require("mongoose");
const OwnerModul = require("../modul/modul");

exports.ownerPost = async (req, res) => {
  try {
    const {
      ImgeUrl,
      NameOfStadium,
      Price,
      Discription,
      time,
      Totime,
      Location,
    } = req.body;
    if (
      !ImgeUrl ||
      !NameOfStadium ||
      !Price ||
      !Discription ||
      !time ||
      !Totime ||
      !Location
    ) {
      return res.status(400).json({ msg: "pls full all requierment" });
    }

    const owner = await OwnerModul.create({
      ImgeUrl,
      NameOfStadium,
      Price,
      Discription,
      Location,
      Totime,
      time,
    });
    res.status(201).json({ msg: "done" });
  } catch (error) {
    res.status(500).json({ err: error.massage });
  }
};

exports.ownerGet = async (req, res) => {
  const owner = await OwnerModul.find();

  res.json(owner);
};

exports.ownerPut = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Not founded" });
  }

  const patch = await OwnerModul.findByIdAndUpdate(id, body, {
    new: true,

    runValidators: true,
  });
  if (!patch) {
    return res.status(404).json({ msg: "error" });
  }
  res.json(patch);
};

exports.ownerDelete = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "invaled od" });
  } else {
    const dele = await OwnerModul.findByIdAndDelete(id);
    if (!dele) {
      res.status(404).json({ msg: "error" });
    } else {
      res.json({ msg: "deleted sccecfully", data: dele });
    }
  }
};
exports.book = async (req, res) => {
  const { id } = req.params;
  const book = await OwnerModul.findById(id);

  res.json(book);
};
