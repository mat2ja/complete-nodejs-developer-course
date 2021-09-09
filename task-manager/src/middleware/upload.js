import multer from 'multer';

const megabytesToBytes = (bytes) => bytes * 1024 ** 2;

const upload = multer({
	dest: 'avatars',
	limits: {
		fileSize: megabytesToBytes(1),
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