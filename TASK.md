Live Answers
The goal is to make a small full-stack application that shows a question and allows the user to submit answers for that question, using React for the frontend, and NodeJS, or Ruby On Rails for the backend, with any database engine. You should not work for more than 4-5 hours on this task.

Create two repositories on either GitHub or Gitlab, one for the front end and one for the backend. Send the links to both repositories.

Requirements
User must be able to submit an answer to the question "Is a hot dog a sandwich? Why?" and get back a success message.

User must be able to submit multiple answers one after the other without reloading the page

User must not be able to submit an empty answer, if the user tries to do so, an error message must be shown
User must not be able to submit answers that consist of "yes" "I don't know" "no" "that's fine". If the user tries to do so, an error message must be shown.

User must be able to see the latest 100 answers to the question (it must be a different page than the form to submit answers).

The answer list must update (without reloading the page) whenever a new answer is submitted by users. (Regular polling to the backend is fine. Websockets are bonus points)

There must be a README that explains how to set up the application.

Bonus Points
Deploy the app to any cloud provider (using the free tier is recommended). Let us know the URL to the app.
