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

## Installation  

### Prerequisites  
- Node.js (v22.17.1 or later)  
- MongoDB (v6.0 or later)  
- Git (v2.30 or later)  

### Setup  

1. Clone the repository  
   ```bash
   git clone https://github.com/EECS3311F25/SplitSmart.git
   cd splitsmart
   ```
2. Install dependencies  
   ```bash
   npm install
   ```
3. Configure environment variables  
   - Copy `env.example` to `.env` and fill in values for:  
     ```
     PORT=
     MONGODB_URI=
     JWT_SECRET=
     ```
4. Run the development server  
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:3000`  

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
