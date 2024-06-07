const multer = require('multer');

// Configuration de Multer
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accepter le fichier si c'est une image
    } else {
        cb(new Error('Only images are allowed!'), false); // Rejeter le fichier si ce n'est pas une image
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = {
    upload: upload // Exporter l'instance de Multer configurée
};
