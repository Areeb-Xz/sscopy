# RPM.md — Release Planning Meeting

## Meeting Details
- **Date:** October 21, 2025
- **Format:** Virtual (Zoom)
- **Team Members:** Mohammad Areeb (Product Owner/Backend), Prabhkrit Singh (Scrum Master/Frontend), Samarjeet Singh (Database & DevOps)

## Release Goal
Deliver a functional expense-sharing platform for students by the end of December 2025, allowing them to log expenses, split costs through various methods, track balances, and settle debts. The MVP will emphasize secure registration/auth, core group/expense workflows, and mobile-first UI.

## Project Scope
**Key Epics / Features**
- User Management & Authentication (Register, Login)
- Group Management (Create, List, Group Membership)
- Expense Tracking (Add, Edit, Delete Expenses)
- Expense Logging & Splitting (to be refined/extended)
- Settlements (Future Sprints)

**Stories for Sprint 1**
- User registration
- User login
- Create group
- List user’s groups
- Expense tracker: add, edit, delete expense items

## Release Timeline
- **Sprint 1 (Nov 3–Nov 17 2025):** Infra, Registration/Auth, Group basics, Expense tracker CRUD
- **Sprint 2 (Nov 18–Dec 1):** Expense flows, auditing, balance calculations
- **Sprint 3 (Dec 2–Dec 15):** Advanced features, testing, polish

## Success Metrics
- Account & group creation fully functional
- Expense tracker CRUD operational
- 3+ splitting methods implemented (by Sprint 2)
- Robust calculations and API correctness
- 80%+ backend test coverage
- Responsive, user-friendly UI/UX

## Technical Decisions
- **Stack:** Java (Spring Boot), MongoDB, React (Vite), JWT Security
- **Patterns:** MVC, Repository, Service, DTOs, Global Exception Handling
- **DevOps:** Git + Github, feature branching, GitHub Actions
- **Environments:** Local, future cloud deployment

## Risks & Mitigations
| Risk                                | Mitigation                     |
|--------------------------------------|--------------------------------|
| Spring/JWT unfamiliarity             | Pair programming, top-down design |
| MongoDB setup quirks                 | Use Atlas, peer review         |
| API contract mismatch front/back     | Document all endpoints in advance |
| Exam period interruptions            | Prioritize main flows in week 1 |
| Feature creep                        | Lock backlog, PO approval needed |

## Decisions
- No offline features in MVP
- Use JWT-based auth, upgrade to SSO post-MVP
- Multi-currency in Sprint 3 if time permits

## Participants' Confirmation
All members agree on these release goals, definitions, and priorities.
