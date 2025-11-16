# SplitSmart

## Motivation  
SplitSmart is an intuitive expense-sharing application designed to help students, roommates, and friends manage shared costs rent, groceries, utilities, and social events accurately and transparently. Traditional methods like spreadsheets, chat threads, or ad-hoc calculations often lead to confusion, forgotten debts, and strained relationships. SplitSmart solves these problems by automating expense logging, splitting, and balance tracking, while offering advanced features tailored for the student lifestyle such as receipt scanning, recurring charges, predictive budgeting, and integration with university systems.

## Project Description  
SplitSmart is a full-stack, MERN-based web application designed to simplify the management and settlement of shared expenses for students, roommates, and friends. It enables users to log any expense rent, utilities, groceries, social outings and automatically calculates each participant’s fair share with precision. Unique features include receipt image scanning with AI itemization, predictive budgeting based on historical data, multi-currency support, and integration with university housing and meal-plan systems. SplitSmart’s modular MVC architecture and rigorous Design by Contract approach ensure maintainability, testability, and scalability. Built with React on the frontend, Node.js/Express on the backend, and MongoDB for flexible data storage, the platform offers offline support, role-based access control, and a gamified financial responsibility scoring system to foster trust among student communities.  

### Features  
- Log and split rent payments based on room size and occupancy  
- Photograph and auto-itemize grocery and receipt images  
- Automated multi-currency conversion with historical exchange rates  
- Recurring expense scheduling for subscriptions and rent  
- Debt-minimization algorithm to reduce settlement transactions  
- Notifications, reports export (CSV/PDF), and detailed audit trails  
- Role-based access control for group approvals  
- Gamification and financial responsibility scoring  
- Offline support with seamless synchronization  


## Installation (Node.js/Express + MongoDB + React/Vite)

### Prerequisites
- Git installed on your machine.
- Node.js v18+ and npm installed.
- MongoDB running locally or a MongoDB Atlas cluster.
- Modern browser (Chrome/Firefox/Edge/Safari).

### 1) Clone the repository
```bash
git clone [https://github.com/EECS3311F25/SplitSmart.git](https://github.com/EECS3311F25/SplitSmart.git)
cd BackEnd
```
### 2) Start MongoDB
- Local: start the MongoDB server process (mongod) so it listens on mongodb://localhost:27017.
- Atlas: copy your mongodb+srv connection string from the Atlas dashboard.

### 3) Backend setup (Node/Express)
- Navigate to your backend folder where package.json for the API exists (e.g., `cd backend`).
- Create a `.env` file with:
```bash
MONGODB_URI=mongodb://localhost:27017/splitsmart
PORT=5000
JWT_SECRET=replace_with_a_secure_random_string
```
- If using MongoDB Atlas, replace MONGODB_URI with your Atlas URI:
```sh
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/splitsmart
```
- Install dependencies:
```sh
npm install
```
- Add scripts to package.json if not present:
```json
{
"scripts": {
"start": "node server.js",
"dev": "nodemon server.js"
}
}
```
- Run the backend:
```sh
npm run dev
```
- The API should be available at:
[http://localhost:5000](http://localhost:5000/)

### 4) Frontend setup (React + Vite)
- Open a new terminal and go to the frontend folder, e.g.:
```sh
cd FrontEnd/signup
```
- Install dependencies:
```sh
npm install
```
- If your app expects an API base URL, create a `.env` file:

VITE_API_URL=[http://localhost:5000](http://localhost:5000/)

- Start the dev server:
```sh
npm run dev
```
- Open the shown Local URL (commonly):

[http://localhost:5173](http://localhost:5173/)


### 5) Verify end-to-end
- Register a user via the frontend.
- Log in with the same credentials.
- Use the dashboard to add, edit, and delete expenses.
- Confirm data persists in MongoDB (local or Atlas).

### 6) Common issues
- Backend port in use: stop the other process or change PORT in `.env`.
- MongoDB connection errors: verify MONGODB_URI and that MongoDB is running.
- Frontend cannot reach API: confirm the backend is on http://localhost:5000 and VITE_API_URL matches.
- Nodemon missing: `npm install --save-dev nodemon` in the backend, then `npm run dev`.


## Contribution  

We welcome contributions from the community. Please follow these guidelines:

1. Branching Strategy  
   - Use `main` for production-ready code.  
   - Create feature branches as `feature/<short-description>`.  
   - Create bugfix branches as `bugfix/<short-description>`.  
2. Issue Tracking  
   - Open GitHub Issues for bug reports or feature requests.  
   - Reference issue numbers in commit messages (e.g., `fixes #12`).  
3. Pull Requests  
   - Fork the repository and create a branch.  
   - Implement your changes and add tests as needed.  
   - Ensure all tests pass and linting passes locally.  
   - Submit a PR against `main`, providing a clear description and referencing related issues.  
4. Code Reviews  
   - All PRs require at least one approving review before merging.  
   - Maintain code quality, readability, and adhere to existing patterns.  

## Resources  
- Make a README: https://www.makeareadme.com/  
- How to write a great README: https://blog.bitsrc.io/how-to-write-beautiful-and-meaningful-readme-md-for-yournext-project-897045e3f991  
- Study well-maintained open-source repos on GitHub for best practices.  

***

For detailed documentation, testing guides, and architecture diagrams, see the `docs/` directory.
