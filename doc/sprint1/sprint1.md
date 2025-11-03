# sprint1.md - Sprint 1 Planning

## Sprint Goal
Establish core technical infrastructure and implement user authentication and basic group management. By end of Sprint 1, users can register, log in, create groups, and view groups.

## Sprint Duration
**Start Date:** October 21, 2025  
**End Date:** November 3, 2025  
**Duration:** 2 weeks

## Participants
- Mohammad Areeb – Backend
- Prabhkrit Singh – Frontend
- Samarjeet Singh – Database/DevOps

## Team Capacity
- 3 members x ~15 hours/week = 90 hours total  
- Buffer: 15 hours for meetings/learning  
- Net capacity: 75 hours

## User Stories Selected for Sprint 1
### 1. User Registration (Backend, DB, Frontend)
- User registers with email/password
- Validates email/password, prevents duplicates
- Confirmation & DB storage

### 2. User Login (Backend, DB, Frontend)
- Logs in with credentials
- JWT token, redirects
- Error handling

### 3. Create Group (Backend, DB, Frontend)
- Enter name, description
- User set as admin
- Success notification

### 4. View Groups List (Backend, DB, Frontend)
- See groups you belong to
- Group info, empty state

## Tasks & Assignment
- **Mohammad**: Auth backend/API/controller/tests, groups backend
- **Prabhkrit**: Auth forms/UI/integration, groups frontend/dashboard
- **Samarjeet**: MongoDB setup, schema, index, test, DevOps

## Development Workflow
- Branching: `main`, `develop`, `feature/<story>`
- PR approval required before merging
- Daily async standups: “Yesterday, Today, Blockers”
- Mid-sprint check-in and sprint review/retro

## Definition of Done
- Code reviewed, merged  
- Acceptance criteria met  
- Unit & integration tests (≥80%)  
- Manual QA  
- Docs updated  
- No critical bugs

## Risks & Mitigation
| Risk                             | Mitigation                                      |
|----------------------------------|-------------------------------------------------|
| MongoDB setup delays             | MongoDB Atlas cloud, early pairing              |
| Frontend-backend API mismatch    | API specs Day 2, use mocks                      |
| JWT/Auth complexity              | Backend pairing, test coverage                  |
| Exam conflicts                   | Prioritize most important user stories early    |
| Scope creep                      | Product Owner (Mohammad) gates changes          |

## Success Criteria
- All five stories completed/tested  
- Auth/group flows functional  
- Responsive frontend  
- 80%+ backend test coverage  
- Demo video and retrospective completed
