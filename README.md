# UNIVERSITY-NODE-EXPRESS-API-

### Table of content 

* General info
* Technologies
* Setup

### Introduction 

Simple RESTFUL API created using Node.JS, Express.JS and MongoDB.

### Technologies

* Node.js
* Express.js
* MongoDB

### Perequisite

Before launching this project you must ensure that you have MongoDB installed locally
Bellow are the links to help you installing it:

 —> https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

 —> https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

 —> https://docs.mongodb.com/manual/administration/install-on-linux/

### Launch

*  git clone git@github.com:JordyBukondaTshibangu/UNIVERSITY-NODE-EXPRESS-API-.git
* cd UNIVERSITY-NODE-EXPRESS-API-
* npm install 
* npm run dev



## APP STRUCTURE AND KEY POINTS


- [x] API ==> Server
			
In the server we import 
    1.  express (The framework on which will be built the app)
    2.  body-parser (It helps sending POST and PUT requests as it enables you to take JSON body data )
    3.  multer (It enables you to upload images)
    4.  jsonwebtoken ( for user authentication and routes protection)
    5.  bcrypt ( for password encryption)
    6. We Used ES6 for a better syntax ( in the package.json "type": "module”)

- [x] Database  ==> Database
    * Import mongoose 
    * Import models
    * Create a connection url
    * Create the connect method 	

- [x] API ==> Models

We use the Mongoose schema to create a schema for the entities in our app
A document schema is a JSON object that allows you to define the shape and content of documents and embedded documents in a collection

We have : 
    * LECTURE schema (fullName, age, email, DOB, description, password )
    *  COURSE schema (name, start, end, lecture, department )
    * STUDENT schema (fullName, age, email, DOB, description, password )

- [x] API ==> Routes

The routes are : 

    1. SIGNUP LECTURE  ==>  POSTT ==> /lectures/
    
    2. SIGNIN LECTURE  ==> POST ==> /lectures/login

    3. VIEW MY PROFILE LECTURE ==> GET ==> /lectures/me

    4. UPDATE MY PROFILE LECTURE ==> PUT ==> /lectures/me/:id

    5. DELETE LECTURE  ==> DELETE ==> /lectures/:Id

    6. VIEW ALL LECTURES ==> GET ==> /lectures/lectures

    7. VIEW A SINGLE LECTURER ==> /lectures/:id

    8. CREATE COURSE ==> POST ==> /courses/

    9. READ ALL COURSES ==> GET ==> /courses/

    10. READ SINGLE COURSE ==> GET ==> /courses/:id

    11. UPDATE COURSE ==> PUT ==> /courses/:id

    12. DELETE COURSE ==> DELETE ==> /courses/:id
   
    13. CREATE STUDENT ==> POST ==> /students/
   
    14. READ ALL STUDENT ==> GET ==> /students/
    
    15. READ SINGLE STUDENT ==> GET ==> /students/:id
    
    16. DELETE STUDENT ==> DELETE ==> /students/:id
    
    17. LOGIN STUDENT ==> POST ==> /student/login
    
    18. VIEW MY PROFILE STUDENT ==> GET ==> /students/me
    
    19. UPDATE MY PROFILE STUDENT ==> PUT ==> /students/me



- [x] MIDDLEWARE ==> Auth
	
	We used JWT(jsonwebtoken) sign and verify method to create a token to authenticate the 
	user and give me access to certain routes where he/she could perform operations
		
	We have the following abilities with auth : 

	* The Lecturer auth (create, login, read, update, delete lecturer)
	* The Lecturer auth (create, update, delete course)
	* The Lecturer auth (create, read student)
	* The student  (login, update, read student)


- [x] To add

	* Ability to upload image
	* Ability to upload file
	* Add moment for date (course start - course end)
	* Add moment for date (date of birth)
	* View student’s courses
	* View student’s lectures
	* View lecturer’s student
	* View lecturer’s courses
