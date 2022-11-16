# Todo_list 📝
My Todo list app (Front end) was built using these technologies.

- React.js
- HTML5
- CSS3
- Figma (Company logo on the login page)

There are two pages: Login & Todo List 

I spent a day (Login page: about 2 hours & Todo list page: about 4 hours) to build this simple todo list app. 

**For the login page**, I was getting a cors error message when API was called with a POST request. In order to fix this, I had to add "{ "Content-Type": "application/x-www-form-urlencoded" }" in the headers. I'm very familiar with this type of errors from my experience, so it didn't take too long to figure it out.

To make the form to be validate onChange, I had to look up some documents and it took about 30 minutes. In order to do this, I added /^[a-zA-Z0-9.!#$%&'*+/=?^ `{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; `in the form onChange and see if the email address matches with it. Otherwise it will fail the validation and give an error message.


On a desktop screen

<img width="1440" alt="Todo_list_page1" src="https://user-images.githubusercontent.com/94145361/202254692-1a0e9dbb-d1a0-4a8c-980d-7440cbb82c79.png">
<img width="1440" alt="Todo_list_page2" src="https://user-images.githubusercontent.com/94145361/202254694-3d9f5d9f-97bd-4638-b5e7-2f021a8a269f.png">

On a mobile screen

<img width="330" alt="Mobile_page1" src="https://user-images.githubusercontent.com/94145361/202255314-4eb75cb6-1cd8-4cb7-8894-31bae70e33c9.png">
<img width="331" alt="Mobile_page2" src="https://user-images.githubusercontent.com/94145361/202255319-89cd5f8c-04e7-4f22-8801-b362a86f8faa.png">


