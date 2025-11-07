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

text
## 📝 Installation Process (For TAs)

### 1. Prerequisites – Install Once

- **Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **Java JDK 17+**: [https://adoptium.net](https://adoptium.net)
- **Maven**: [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)
- **Node.js (v18+) & npm:** [https://nodejs.org/](https://nodejs.org/)
- **MongoDB:** (Use local install or [MongoDB Atlas](https://www.mongodb.com/atlas))
    - To run locally: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

---

### 2. Clone the Repository


git clone [https://github.com/Areeb-Xz/sscopy.git](https://github.com/Areeb-Xz/sscopy.git)
cd sscopy
text

---

### 3. Start MongoDB

- If local: open a new terminal and run:
    ```
    mongod
    ```
- If using Atlas: get your MongoDB URI and username/password.

---

### 4. Setup and Run the Backend (Java Spring Boot)


cd backend
text

Edit `src/main/resources/application.properties`:

- For local MongoDB:
    ```
    spring.data.mongodb.uri=mongodb://localhost:27017/splitsmart
    ```
- For MongoDB Atlas (replace with your real credentials):
    ```
    spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/splitsmart
    ```

**Build and run:**

mvn clean install
mvn spring-boot:run
text

The backend will run on: [http://localhost:5000](http://localhost:5000)

---

### 5. Setup and Run the Frontend (React + Vite)

_Open a new terminal tab/window:_


cd FrontEnd/signup
npm install
npm run dev
text

The frontend will run on: [http://localhost:5173](http://localhost:5173) (or whatever Vite displays)

---

### 6. How to Test

- In your browser, go to: [http://localhost:5173](http://localhost:5173)
- Register a new user (fill the sign-up form)
- Log in
- Use the dashboard and the expense tracker!
- Add/Edit/Delete expenses, confirm total recalculates in real time.
- Backend API is also documented with endpoint comments.

---

### 7. If You Encounter Errors

- **Backend fails to start:**  
    - "Port in use" – Use `lsof -i :5000` and kill the blocking process.
    - "MongoDB connection fail" – Is `mongod` running? Is your URI correct?
- **Frontend fails to start:**  
    - Try deleting `node_modules` and run `npm install` again.
    - Use `npm run dev -- --port 5174` if port is in use.
- **API requests fail:**  
    - Is backend running on `localhost:5000`?
    - Is MongoDB running?
    - Is the correct API URL set in `.env` if needed?

---

### 8. Stopping the Application

- To stop backend: press `Ctrl+C` in the backend terminal
- To stop frontend: press `Ctrl+C` in the frontend terminal
- To stop MongoDB: close the mongod terminal or stop service

Copy and paste this directly into your README or submission. This will let the TA set up, build, and run your full project with no ambiguity!

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
