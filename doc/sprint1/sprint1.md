# sprint1.md — Sprint 1 Plan

## Sprint Goal
Deliver core technical infrastructure, with secure user registration, login, group creation, group listing, and an expense tracker that lets users add, edit, and delete expense items. All APIs align to the main user stories.

## Sprint Details
- **Start:** Oct 21, 2025  
- **End:** Nov 3, 2025  
- **Team:** Mohammad Areeb (Backend), Prabhkrit Singh (Frontend), Samarjeet Singh (DB/DevOps)

## Team Capacity Estimate
- 3 × 15h/week × 2 weeks = 90 hours  
- 15h buffer for reviews, meetings, and learning  
- **Net dev hours:** 75h

## User Stories
### 1. User Registration
- Register with first name, last name, email, password, confirm password
- Validates formats, prevents duplicates, secure storage
- Direct login on success and JWT issuance

### 2. User Login
- Login via email & password, validates credentials, issues JWT

### 3. Create Group
- User creates a group, becomes admin, optional description, group appears in list

### 4. List Groups
- User can view all groups, choosing group loads details

### 5. Expense Tracker CRUD
- User can add new expenses (amount, description, category, date)
- User can edit existing expenses
- User can delete expenses
- All expense operations update in real-time and are reflected in group/account balance

## Acceptances (All)
- All APIs tested via Postman/unit/integration
- Frontend allows all main flows (register/login/create/list, expense tracker add/edit/delete)
- Errors, loading, edge cases all handled
- Docs/RPM updated

## Task Assignment
- **Mohammad:** Security, Auth/Expense/GroupController, backend endpoints, service layer, global exception, test coverage
- **Prabhkrit:** Registration/login/group and expense forms/components, React API integration, CRUD UI, error display
- **Samarjeet:** MongoDB schema/models, DB queries, test DB, prod/infra, GitHub/CI setup

## Workflow & Process
- Branching ('main', 'feature/<story>')
- Daily async standup: Yesterday / Today / Blockers (GitHub/Slack)
- PR review before merge
- Demo + team retro on Sprint close (Nov 17)
- See RPM.md for release-level process

## Definition of Done
- PR reviewed & merged
- All acceptance criteria passed
- Test coverage >80%
- Manual QA
- No critical bugs

## Risks & Mitigation
| Risk                      | Mitigation              |
|---------------------------|-------------------------|
| Mongo issues              | Use Atlas / troubleshoot early |
| Auth/Expense logic complexity | Dedicated pairing + doc |
| API mismatch              | Contract reviewed by all |
| Time crunch on exams      | Prioritize stories in week 1 |
| Scope creep               | Locked sprint, PO control |

## Success Criteria
- 5 stories fully done and tested
- All data flowing end-to-end
- All functionality verified (API, frontend, DB)
- Sprint retro documented
