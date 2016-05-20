'use strict'
import {checkAllCourses} from './watcher.js'
import * as nodemailer from 'nodemailer'
import {TERM, USER_CLASSES, USER_EMAIL} from './account_details.js'
import {isEqual} from 'lodash'
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(`smtps://${USER_EMAIL.user}%40gmail.com:${USER_EMAIL.password}@smtp.gmail.com`);

//previous open. check to see if there's any difference with the current open.
let previous = null;
const decideIfEmail = courseResults => {
	let mailOptions = {
			from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
			to: 'edward.s.hu.cs@gmail.com', // list of receivers
			subject: 'There has been a class change', // Subject line
			text: 'Hello world 🐴', // plaintext body
			html: ''
	};

	let sendEmail = false;
	for(let x = 0; x < courseResults.length; ++x){
		let course = courseResults[x];
		let open = course.open;
		if (previous != null) {
			//if a class changed
			if(!isEqual(previous, open)) {
				sendEmail = true;
				previous[i].open = open;
				// setup e-mail data
				mailOptions.html += `<h1>${course.className}</h1>`;
				(course.sections).forEach((section,i ) => {
					mailOptions.html += `<p>${section}: ${open[i]}</p><br>`;
				} );
			}
		} else { //if previous is null
			previous = courseResults;
			break;
		}
	}
	if(sendEmail){
		console.log("sendEmail is true");
		transporter.sendMail(mailOptions, (error, info) => {
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
	} else {
		console.log("No changes at", new Date().toJSON());
	}
}

const mail = () => {
	//console.log(USER_CLASSES, TERM);
	checkAllCourses(USER_CLASSES, TERM).then(decideIfEmail);
}
mail();
