# BlackBoard

Welcome to BlackBoard, A platform for students to manage their courses and enter chatrooms to have conversation with other course mates enrolled in the course. Admins will be able to manage courses which the students can enroll in and manage the students to ensure that the chatrooms are free from any disruptions.  
To jump directly on how to use the platform skip to How To Run the Application.

# Features:
## Students:

Register/Login as a new student using name and userId.  
Access courses registered in and find more details about the courses.  
Search for courses and register in them.  
Unenroll in courses.  
Access each individual course chat room and send messages to peers registered in the course with a profanity filter in built.  
( Future additions include being able to submit files and assignments via these chatrooms )  

## Admin:
Login as an admin - current default login for admin is 999999999 and password is password.  
Create new courses by filling in a form.  
Edit existing courses and their details.  
Delete students in case any of them are dirupting the chat forum.  
( Future additions include being able to change the courses students are enrolled in and their messages sent in the chatrooms )  

# How to Run the Application:
Please read this completely before heading to the website.  
The website is hosted on https://blackboard-engage.netlify.app/ The servers are freebies and really slow so please be patient while navigating the site.  
The backend is hosted on Heroku and API calls can be made to https://black-board-engage.herokuapp.com/ I'll attach a link with all the api calls below.  
All data is saved to my MongoDB cloud servers and schema for the same can be found in server/schemas.  
So while stress testing or trying to break the application please do this instead of using the website so it does not affect other users:
1. Clone the master branch repo onto a local folder with git clone.  
2. Navigate to both the server side and client side and do "npm install" to install the required dependancies.  
3. Once installation is done, create an mongo atlas cluster on https://www.mongodb.com/cloud/atlas.  
4. And under config/keys.js change the URI to that of your newly created Mongo Atlas Cluster URI.  
5. Once done, run "npm start" in both the client and server directories and the backend and frontend should be running simultaneously.  
6. Feel free to experiment with anything after that, and make custom API calls on Postman too. Have fun :)  

In case of any issues or major bugs or any suggestions or improvements, please create an issue in GitHub or mail to me at mouni221100@gmail.com, I really enjoy working on them and would love to find ways to work on all suggestions. Thanks for reading so far and hope you like the application.




