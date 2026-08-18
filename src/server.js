const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(
    path.join(__dirname, "../public")
));


// ================================
// ANA SAYFA
// ================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "../public/index.html"
        )
    );

});


// ================================
// TEST API
// ================================

app.get("/api/test", (req, res) => {

    res.json({

        success: true,

        message:
            "DersTakip backend çalışıyor! 🚀"

    });

});


// ================================
// SUNUCU
// ================================

app.listen(
    PORT,
    () => {

        console.log(
            `DersTakip ${PORT} portunda çalışıyor.`
        );

    }
);
