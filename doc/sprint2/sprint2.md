# sprint2.md — Sprint 2 Plan

## Sprint Goal

Enable group collaboration features with full member management, group listing, and basic equal expense splitting. Build upon Sprint 1's authentication and expense tracker foundation to deliver multi-user functionality.

---

## Sprint Details

- **Start:** November 7, 2025 (Sprint Planning Meeting: 2:00 PM – 3:30 PM EST)
- **End:** November 17, 2025
- **Duration:** 2 weeks (10 working days)
- **Team:** Mohammad Areeb (Backend), Prabhkrit Singh (Frontend), Samarjeet Singh (DB/DevOps)

---

## Sprint Planning Meeting Notes

**Date:** Friday, November 7, 2025  
**Time:** 2:00 PM – 3:30 PM EST  
**Location:** In person  
**Attendees:** Mohammad Areeb ✅, Prabhkrit Singh ✅, Samarjeet Singh ✅

### Meeting Agenda:
1. Sprint 1 retrospective (what went well, what could be improved, grading rubric)
2. Review of incomplete stories ([2.1] Create Group, [2.2] View Groups List) and blockers
3. Discussion and planning for Sprint 2 user stories
4. Assignment of responsibilities for group features and expense splitting
5. Definition of acceptance criteria and story point estimation
6. Risk assessment and mitigation planning

---

## Team Capacity Estimate

- **3 members × 15 hours/week × 2 weeks = 90 hours**
- **15 hours buffer** for reviews, meetings, integration testing, and documentation
- **Net development hours:** 75 hours

**Lessons from Sprint 1:**
- Actual velocity: ~6.5 SP/week (13 SP completed in 2 weeks)
- Add 20% buffer for unknowns and integration complexity
- **Sprint 2 Target:** 16-18 SP (realistic range based on velocity)

---

## User Stories for Sprint 2

### Priority 1: Carried Forward from Sprint 1

#### [2.1] Create Group — 5 SP
**As a** student expense tracker user  
**I want to** create a new group with a name and optional description  
**So that** I can organize shared expenses with specific roommates or friends

**Acceptance Criteria:**
- User can enter group name (required) and description (optional)
- User becomes group admin upon creation
- Group appears in user's groups list immediately after creation
- Backend validates group name uniqueness per user
- Frontend displays success message and redirects to group detail page
- Error handling for duplicate names, empty fields, and network failures

**Technical Notes:**
- Backend API: `POST /api/groups`
- MongoDB collection: `groups` with fields: `name`, `description`, `adminId`, `createdAt`
- Frontend: Modal/form component with validation

**Status from Sprint 1:** 80% backend complete, 40% frontend complete  
**Remaining Effort:** 4 hours backend, 6 hours frontend

---

#### [2.2] View Groups List — 3 SP
**As a** student expense tracker user  
**I want to** see a list of all groups I belong to  
**So that** I can quickly navigate to the group I want to manage

**Acceptance Criteria:**
- User can view all groups they created or are a member of
- List displays group name, member count, and creation date
- User can click on a group to view details
- Groups are sorted by most recently active
- Empty state shown if user has no groups
- Loading state and error handling implemented

**Technical Notes:**
- Backend API: `GET /api/groups` (returns array of groups for authenticated user)
- Frontend: Groups list component with card layout
- Query optimization: Index on `userId` and `createdAt`

**Status from Sprint 1:** Backend query ready, frontend not started  
**Remaining Effort:** 2 hours backend polish, 3 hours frontend

---

### Priority 2: New Sprint 2 Stories

#### [2.3] Add Members to Group — 5 SP
**As a** group admin  
**I want to** invite members to my group by email  
**So that** they can participate in shared expense tracking

**Acceptance Criteria:**
- Admin can search for users by email address
- System validates email exists in database
- User is added to group members list with role "Member"
- Admin cannot add duplicate members
- Added member sees group in their groups list
- Email notification sent to added member (optional for Sprint 2)
- Error handling for invalid emails, non-existent users, duplicates

**Technical Notes:**
- Backend API: `POST /api/groups/:groupId/members`
- Frontend: Search modal with email autocomplete
- Access control: Only group admin can add members
- MongoDB: Update `groups.members` array with `{ userId, email, role, joinedAt }`

**Story Points:** 5 SP  
**Assigned:** Mohammad (Backend - 8h), Prabhkrit (Frontend - 7h)

---

#### [2.4] View Group Members — 3 SP
**As a** group member  
**I want to** see all members in my group  
**So that** I know who is part of the expense sharing

**Acceptance Criteria:**
- User can view list of all group members
- Display shows member name, email, role (Admin/Member), and join date
- Admin badge/indicator shown for group creator
- Member count displayed prominently
- Empty state if no members yet (only admin)

**Technical Notes:**
- Backend API: `GET /api/groups/:groupId/members`
- Frontend: Members list component in group detail page
- Query joins `users` collection for member details

**Story Points:** 3 SP  
**Assigned:** Mohammad (Backend - 4h), Prabhkrit (Frontend - 4h)

---

#### [2.5] Equal Expense Splitting (Basic) — 8 SP
**As a** group member  
**I want to** split an expense equally among all members  
**So that** everyone pays their fair share automatically

**Acceptance Criteria:**
- User can create a group expense with total amount
- System divides expense equally among all group members
- Each member sees their share amount (rounded to 2 decimals)
- Running balance per member updates automatically
- Expense history shows who paid and who owes
- Edge case: Handle odd-cent remainder (assign to payer)
- Error handling for invalid amounts, empty groups

**Technical Notes:**
- Algorithm: `shareAmount = Math.round(totalAmount / memberCount * 100) / 100`
- Handle remainder: `remainder = totalAmount - (shareAmount * memberCount)`
- Backend API: `POST /api/groups/:groupId/expenses`
- MongoDB: `groupExpenses` collection with fields: `groupId`, `amount`, `paidBy`, `splitAmong[]`, `shares[]`
- Frontend: Expense form in group detail page with real-time calculation display

**Story Points:** 8 SP  
**Assigned:** Mohammad (Backend - 12h), Samarjeet (DB optimization - 4h), Prabhkrit (Frontend - 8h)

---

### Priority 3: Optional (Stretch Goal)

#### [2.6] Remove Member from Group — 3 SP (OPTIONAL)
**As a** group admin  
**I want to** remove a member from the group  
**So that** they no longer have access to group expenses

**Acceptance Criteria:**
- Admin can remove any member (except themselves)
- Confirmation prompt before removal
- Removed member loses access to group immediately
- Past expense history preserved (shows "Former Member")
- Admin cannot remove themselves (must delete group instead)

**Story Points:** 3 SP  
**Status:** Deferred to Sprint 3 if time allows

---

## Acceptance Criteria (All Stories)

### Technical Requirements:
- All APIs tested via Postman and unit tests
- Frontend components tested with React Testing Library (goal: 80% coverage)
- Error handling for all edge cases (network failures, validation errors, empty states)
- Loading states implemented for all async operations
- Responsive design works on mobile and desktop

### Documentation Requirements:
- API endpoints documented in README
- Sprint retrospective (SR2.md) completed
- All standup meetings logged (minimum 3 per person)
- Demo video recorded (~3 minutes)

### Code Quality:
- All PRs reviewed and approved before merge
- ESLint/Prettier checks pass
- No console errors or warnings in production build
- Git commits reference Trello ticket IDs

---

## Task Assignment

### Mohammad Areeb (Backend - 30h)
- Complete [2.1] Create Group API (4h)
- Polish [2.2] View Groups List API (2h)
- Implement [2.3] Add Members API with email validation (8h)
- Implement [2.4] View Members API (4h)
- Implement [2.5] Equal splitting algorithm and API (12h)
- Unit tests for all endpoints (included in estimates)

### Prabhkrit Singh (Frontend - 28h)
- Complete [2.1] Create Group form and modal (6h)
- Implement [2.2] Groups list UI with cards (3h)
- Implement [2.3] Add Members search modal (7h)
- Implement [2.4] Members list component (4h)
- Implement [2.5] Expense form with split calculation display (8h)

### Samarjeet Singh (DB/DevOps - 17h)
- Optimize MongoDB queries for groups and members (4h)
- Implement indexes on `groups.adminId`, `groups.members.userId` (2h)
- Database schema updates for `groupExpenses` collection (3h)
- Assist with [2.5] splitting algorithm database optimization (4h)
- Production environment stability checks (2h)
- CI/CD pipeline updates (2h)

---

## Workflow & Process

### Development Process:
- Feature branches: `feature/[ticket-id]-description` (e.g., `feature/2.1-create-group`)
- Commit messages: `[Ticket ID] Description` (e.g., `[2.1] Add group creation API endpoint`)
- Pull requests require 1 approval before merge to main
- Daily async standups: Post in Slack/GitHub Discussions
  - Format: Yesterday / Today / Blockers / ETA
- Weekly sync meeting: Thursdays 4:00 PM EST (30 minutes)

### Testing Strategy:
- Backend: Jest unit tests for controllers and services (target: 80%+ coverage)
- Frontend: React Testing Library for components (target: 70%+ coverage)
- Integration testing: Postman collection with all API flows
- Manual QA: Full user flow testing before demo

### Demo & Documentation:
- Demo recording: November 17, 2025, 10:00 AM EST
- All team members present and demonstrate features
- Sprint retrospective: November 17, 2025, after demo
- Documentation updates: README, API docs, system design

---

## Definition of Done

A story is "Done" when:
- ✅ Code implemented and tested (unit + integration)
- ✅ PR reviewed and merged to main branch
- ✅ All acceptance criteria met and verified
- ✅ Manual QA completed with no critical bugs
- ✅ Documentation updated (README, API docs)
- ✅ No console errors or warnings
- ✅ Responsive design verified on mobile and desktop
- ✅ Trello card moved to "Done" column

---

## Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Equal splitting algorithm complexity | High | Medium | Spike session on Nov 8; reference industry patterns (Splitwise) |
| Time crunch before Nov 17 deadline | High | Medium | Prioritize P1 stories; defer [2.6] if needed |
| Frontend/backend integration delays | Medium | Low | API contracts defined upfront; integration tests by Nov 12 |
| MongoDB query performance issues | Medium | Low | Index optimization early; Samarjeet focuses on DB performance |
| Team member availability (exams) | Medium | Medium | Front-load work in week 1; buffer time in week 2 |
| Scope creep (adding features mid-sprint) | Low | Medium | Lock backlog after planning; use "Future" label for new ideas |

---

## Success Criteria

Sprint 2 is successful if:
- ✅ All 5 stories completed and tested (16 SP minimum)
- ✅ Group creation, listing, member management fully functional
- ✅ Equal expense splitting algorithm working correctly
- ✅ All features demoed in video with real user flows
- ✅ Zero critical bugs; all edge cases handled
- ✅ Test coverage: 80%+ backend, 70%+ frontend
- ✅ Sprint retrospective completed with actionable insights
- ✅ Documentation up to date (README, API docs, system design)

---

## Sprint 2 Schedule

### Week 1 (Nov 7-10):
- **Nov 7 (Thu):** Sprint planning meeting, start [2.1] and [2.2]
- **Nov 8 (Fri):** Complete [2.1] and [2.2], spike on [2.5] algorithm
- **Nov 9 (Sat):** Start [2.3] Add Members
- **Nov 10 (Sun):** Continue [2.3], start [2.4]

### Week 2 (Nov 11-17):
- **Nov 11 (Mon):** Complete [2.3] and [2.4]
- **Nov 12 (Tue):** Start [2.5] Equal Splitting (integration testing checkpoint)
- **Nov 13-15 (Wed-Fri):** Complete [2.5], polish UI, fix bugs
- **Nov 16 (Sat):** Final testing, standup #3, prep for demo
- **Nov 17 (Sun):** **Demo recording 10am**, retrospective, documentation finalization

---

## Prepared By

**Team:** Group K (SplitSmart)  
**Course:** EECS3311 - Software Engineering  
**Institution:** York University  
**Date:** November 7, 2025  
**Sprint Duration:** November 7 - November 17, 2025