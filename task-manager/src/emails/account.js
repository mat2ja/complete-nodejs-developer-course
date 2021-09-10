import sgMail from '@sendgrid/mail';

const sendgridAPIKey =
	'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';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
	to: 'xogol24753@ppp998.com',
	from: 'matija.osrecki@gmail.com',
	subject: 'this is my first creation',
	text: 'wow there are many good chicks in chickago',
});
