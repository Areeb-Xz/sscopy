# SR1.md — Sprint 1 Review

## Team: Group K (SplitSmart)
- Mohammad Areeb (Backend)
- Prabhkrit Singh (Frontend)
- Samarjeet Singh (Database & DevOps)

---

## Sprint Goal Recap
Deliver a functional expense-sharing web app for students with secure authentication, ability to create groups, and a working personal expense tracker including add, edit, and delete.

---

## Sprint Outcomes

### What Was Accomplished

- **Backend:**
    - User registration and login with JWT authentication
    - MongoDB data storage and connection setup
    - Group creation and group membership endpoints
    - Expense tracker CRUD API: add, edit, delete expenses

- **Frontend (React + Vite + Tailwind):**
    - Registration and login forms with validation and error handling
    - Responsive dashboard layout with main navigation structure
    - Expense tracker UI: add, edit, delete
    - Real-time total spend calculation and instant feedback

- **DevOps:**
    - Local and cloud MongoDB option
    - GitHub repository maintained (with README + installation guide)

---

## Demo Video
- [SplitSmart Sprint 1 Demo] https://drive.google.com/file/d/1po_Ku-kJHZZRig8ZO3s5XCwP7kUnSHb3/view?usp=sharing
  - Demonstrates working registration, login, group creation, and full expense tracker CRUD.
  - Shows all team members present and demoing.

---

## Sprint 1 User Stories Delivered

1. **User Registration / Login**
   - New users can register and login securely with validations.
2. **Create Group / List Groups**
   - Users can create a group and see a list of all groups they belong to.
3. **Expense Tracker (CRUD)**
   - Users can add a new expense, edit existing ones, and delete items.
   - Total updates instantly for any operation.

---

## Goals Met

- [x] Working backend and frontend with database integration
- [x] All main flows fully functional and tested (manual, some unit tests)
- [x] Realistic test data, working session handling, error messages shown
- [x] Clean, mobile-friendly UI and workflow
- [x] Installable and reproducible by TAs (see README)
- [x] Demo video recorded and linked

---

## Unfinished / Deferred (To Sprint 2)

- Adding friends/invite members to groups
- Group-level expense and balance calculations
- Advanced splitting/settlement features
- More extensive frontend polish and accessibility improvements

---

## What Went Well

- Good division of labor across all three members
- Tech stack (Java/React/Mongo) integrated without major issues
- Major flows (register, login, create group, add/edit/delete expense) fully done

---

## Challenges & Lessons

- Initial backend/frontend alignment required extra coordination and interface testing
- Password validation and error handling needed careful testing
- MongoDB Atlas access control and connection string format troubleshooting

---

## Next Steps (Sprint 2 Preview)

- Enable group membership/invite features and multi-user expense flows
- Implement group-wide splits and automatic debt calculation
- Review all Sprint 1 code and refactor for quality
- Improve UI for accessibility and usability
- Plan for start of mobile support and multi-currency

---

Prepared by **Group K** for EECS3311, York University — Fall 2025.