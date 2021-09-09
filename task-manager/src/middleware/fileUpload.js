import multer from 'multer';

const upload = multer({
	dest: 'avatars',
	limits: {
		// size in bytes → 1MB
		fileSize: 1 * 1024 * 1024,
	},
	fileFilter(req, file, cb) {
		const fileTypeRegex = /image\/jpg|jpeg|png$/;
		if (!file.mimetype.match(fileTypeRegex)) {
			cb(new Error('You must upload an image you dimbuss!!!'));
		}
		cb(null, true);
	},
});

export default upload;
