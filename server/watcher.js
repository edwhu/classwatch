'use strict'
import {requestSection} from './request_course.js'
const log = x => console.log(x);
//checks if section is open
const checkIfOpen = (id, coursename, term) => {
	return new Promise((resolve, reject) => {
		let dept = coursename.split('-')[0];
		requestSection(coursename, dept, term, (err,section) => {
			if(err) return reject(new Error("requestSection failed"));
			let sectionToCheck = section.filter(x => x.id === id );
			if(sectionToCheck.length == 0){
				reject(new Error(`no section with ${id} found`));
			} else {
				let section = sectionToCheck[0];
				//console.log(section);
				let open = parseInt(section.number_registered) < parseInt(section.spaces_available);
				//console.log(open);
				resolve(open);
			}
		});
	});
}

//takes in a class object and checks all sections. {className: "MATH-226", sections:[1,2,3]}
//adds {className:"MATH-226", sections:[1,2,3], open:[true,false,true]} to an array

const checkAllSections = (object, term) => {
	return new Promise((resolve, reject) => {
		let sections = object.sections;
		let promiseArray = sections.map(sectionID => checkIfOpen(sectionID, object.className, term));

		Promise.all(promiseArray).then(x => {
			let resultObject = {};
			resultObject.className = object.className;
			resultObject.sections = sections;
			resultObject.open = x;
			resolve(resultObject);
		});
	});
}

export const checkAllCourses = (courses, term) => {
	return new Promise((resolve,reject) => {
		let promiseArray = courses.map(course => checkAllSections(course,term));
		Promise.all(promiseArray).then(x => resolve(x));
	});
}
