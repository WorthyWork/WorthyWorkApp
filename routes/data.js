const express = require("express");
const router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../secret/worthywork-a6beb-firebase-adminsdk-trmkn-b9ca7ff7f5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

router.post("/push", async (req, res) => {
    // #swagger.tags = ['Data']
  var mbti = req.body.mbti;
  var disc = req.body.disc;
  var rating = req.body.rating;
  var cjn = req.body.cjobname;
//   var r = `mbti_disc:${mbti_disc}, rating:${rating}, cjobname:${cjn}`;
  try {
    await db.collection("data").doc().set({
      mbti: mbti,
      disc: disc,
      rating: rating,
      cjobname: cjn,
    });
    res.json({Success:"Data Added"})
  } catch (error) {
    var errorMessage = error.message;
    console.log(errorMessage)
    res.status(500).json({error:errorMessage});
  }
});

module.exports = router;
