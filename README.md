# Welcome To HorizonAI Chatbot!

How to Run:

# Frontend

```
git clone
cd horizon-chatbot
```

```
cd chat-bot-front
npm i
npm run dev
// make sure that your localhost is set to 5173.
```

# Backend
```
- cd chat-bot-backend
- npm i
- npm start
// make sure that your localhost is set to 3000.
```

# LLM
The model that I used is **hf_mradermacher_Llama-3.2-3B-Instruct.Q8_0.gguf**

Make sure you have the following folder structure to run it:

chat-bot-backend/models/**MODEL_NAME**

# Technical Choices
 This project, in its **current** form, is very small. it has two basic pages, a header and a simple drawer. having that in mind,
 I decided to use **as few dependencies as possible.** Performance was a big deal in this project, and initial loading time is a part of that performance rating.
 
 For the routing, I chose a small routing library called **Wouter**, which resembles the old Reacet Router (before it became a Fullstack Framework).
 
 For the form handling, I chose to handle that logic on my own. Loading such a feature-full and large library like React-Hook-Form felt like an overkill for a simple input.
 
 I added Zod for input validation, because they're just too good. (plus, it's a very light-weight library).

 Adding a UI-Kit (MUI, Mantine, Tailwind) also felt like an overkill. I felt there was no need for all that boilerplate and configurations, for less than 10 components.

# Missing Features/Requirements for Production
- Chat Sessions
  
 Proper session management is necessary for this application.

 Sessions should be controlled by the Backend, in Redis or a traditional DB where we could handle multitple sessions for many users.
 Currently, all sessions will be terminated if (when!) the process ends.
 Also, we're currently managing user sessions in-memory with a simple mapped object. I'd move all of that logic to a Redis server so that we could retreive sessions after, for example, a process restart.

 Additionaly, sessions should have a name. switching sessions by ID can be confusing.
 

 - Auth
   
 There was no authentication or authorization specifications in the docs; I'd add a simple JWT authentication scheme to control user sessions.
 I'd save the JWT token in the client's machine via httponly cookie, and have them send that token to the Backend to manage users sessions.
 

- Aborting streamed responses

   I started messing around with aborting streamed responses, but I hadn't had the time to finish it.
   Users should be able to stop streamed responses.

- Error Handling
  
  I'd add better error handling. Users should be better informed when an error has occured.
  An example would be adding an error boundary and an error page.

- Security
 
    The App is not secured enough.
    More security mechanisms must be employed. preferrably a Firewall, Authentication/Authorization schemes, mechanisms for XSS, Token Forgery, and more should be employed.
  
    HTML Sanitization was added, but it should be improved upon and customized for our needs in production.

- Unit Testing
- Logging
- UI Kit

  Once we scale the application on the frontend, (i.e, develop more pages / features), vanilla css/postcss becomes cumbersome.
  In its current state, if we had more than 2 developers working on the app, we'd quickly find ourselves duplicating many of the styles and the logic that was already implemented, developed and tested by the developers of MUI/Mantine/Tailwind etc.



# Performance / Scaling
The first thing that comes to mind is scaling vertically, and add more processing power to the PC running the LLM (my PC could only work with 3 sequences)

Additionaly, We could try to scale the application horizontally, and create more processses using containers.

Containerization of the back-end will allow us to run more processes, and thus run more sessions/chats simultaneously.

 
 
 The clientside is already optimized using useCallback and React.memo, but we could utilize more robust caching for the chat history using React-Query or server response caching,
 so that it wouldn't retreive chata history on every mount. (not on every re-render).
 
 
 
 
 

