# SR1.md — Sprint 1 Retrospective

## Team: Group K (SplitSmart)
- Mohammad Areeb (Backend Developer)
- Prabhkrit Singh (Frontend Developer)
- Samarjeet Singh (Database & DevOps Engineer)

---

## Retrospective Meeting Details
- **Date:** November 2, 2025
- **Time:** 6:00 PM - 8:00 PM EST
- **Format:** In-person meeting
- **Location:** York University campus
- **Participants:** Mohammad Areeb ✅, Prabhkrit Singh ✅, Samarjeet Singh ✅
- **All members participated:** YES

---

## Sprint Goal Recap
Deliver a functional expense-sharing web app for students with secure authentication, ability to create groups, and a working personal expense tracker including add, edit, and delete.

---

## Sprint Outcomes

### What Was Accomplished ✅

**Backend (Node.js/Express):**
- User registration API with password validation and bcrypt hashing
- User login API with JWT authentication (24h token expiry)
- MongoDB connection setup (local and Atlas support)
- Group creation API endpoints (partially complete)
- Expense tracker CRUD API: add, edit, delete expenses
- Global error handling and validation middleware
- Security: CORS, input sanitization, secure headers

**Frontend (React + Vite + TailwindCSS):**
- User registration form with validation and error display
- User login form with session persistence
- Responsive dashboard layout with navigation
- Expense tracker UI: add, edit, delete operations
- Real-time total spend calculation
- Error messages and success feedback
- Mobile-friendly responsive design

**DevOps & Infrastructure:**
- GitHub repository setup with main branch protection
- MongoDB local and Atlas configuration
- Node/npm dependency management
- Installation documentation for TAs
- Demo video recorded and submitted (~3 minutes)

**Completed User Stories:**
- ✅ [1.1] User Registration — 5 SP
- ✅ [1.2] User Login — 3 SP
- ✅ [1.5] Expense Tracker CRUD — 5 SP
- **Total: 13 SP completed**

---

## Unfinished Stories (Carry to Sprint 2)

- **[2.1] Create Group** — 5 SP
  - **Status:** In Progress (API ~80% done, Frontend ~40% done)
  - **Blocker:** Frontend integration with backend group endpoints needed final testing
  - **Effort Remaining:** ~4 hours backend, ~6 hours frontend
  - **Reason:** Scope underestimated; more validation and error handling needed than planned

- **[2.2] View Groups List** — 3 SP
  - **Status:** In Progress (Backend query ready, Frontend not started)
  - **Blocker:** Waiting on Create Group completion for testing
  - **Effort Remaining:** ~2 hours backend polish, ~3 hours frontend
  - **Reason:** Time constraints; prioritized expense tracker completion

---

## Sprint Metrics

| Metric | Value |
|--------|-------|
| **Sprint Capacity** | 75 hours |
| **Sprint Duration** | 2 weeks (Nov 3–17) |
| **Stories Started** | 5 |
| **Stories Completed** | 3 |
| **Story Points Completed** | 13 SP |
| **Story Points In Progress** | 8 SP |
| **Team Velocity** | ~6.5 SP/week |
| **Code Coverage** | ~70% (backend), ~60% (frontend) |

---

## Best Practices — What Went Well 👍

1. **Clear Role Division**
   - Backend, frontend, and DevOps responsibilities were well-defined
   - Minimal handoff delays due to clear API contracts

2. **Daily Async Standups (GitHub + Slack)**
   - Team stayed aligned on blockers and progress
   - Helped catch integration issues early
   - No meetings required; efficient async communication

3. **GitHub PR Workflow**
   - Peer reviews caught bugs before merge
   - Prevented regressions in main branch
   - Good documentation in commit messages

4. **Test-First on Critical Paths**
   - Authentication and data validation tested rigorously
   - Reduced production bugs in demo

5. **Early Integration Testing**
   - Frontend/backend tested together from week 1
   - Found JWT token issues early, fixed quickly

---

## Challenges — What Could Improve ⚠️

1. **Story Point Estimation**
   - Create Group story underestimated by ~3 SP
   - Lesson: Add 20% buffer for unknowns in future sprints
   - Action: Use historical velocity to refine estimates

2. **Last-Minute Integration Testing**
   - Demo video required scrambling to fix final bugs
   - Action: Start integration tests by sprint day 7

3. **Limited Unit Test Coverage**
   - Frontend components lacked unit tests
   - Backend had basic tests but not comprehensive
   - Action: Implement React Testing Library tests early in Sprint 2

4. **Documentation Gaps**
   - API endpoint docs created late
   - Slowed frontend/backend integration coordination
   - Action: Document API contracts before implementation

5. **Scope Creep**
   - Added error boundary and retry logic mid-sprint
   - Pushed Create/View Groups to Sprint 2
   - Action: Lock backlog once sprint starts; use "future" label for nice-to-haves

---

## Practices to Continue 🔄

- ✅ Async standups via Slack (no meeting overhead)
- ✅ GitHub PRs with mandatory review before merge
- ✅ Clear API contracts documented upfront
- ✅ Feature branches for each story (no conflicts)
- ✅ Early frontend/backend integration testing

---

## Practices to Stop ❌

- ❌ Last-minute integration testing
- ❌ Vague story descriptions (need acceptance criteria)
- ❌ Skipping unit tests to "save time"

---

## Practices to Start ✨

- **Unit Tests:** React Testing Library for components; Jest for backend logic
- **Regular Sync Meetings:** One 30-min sync per week (instead of all async)
- **API Documentation:** Swagger/OpenAPI for auto-generated docs
- **Code Style Guide:** ESLint + Prettier for consistent code
- **Burndown Chart:** Weekly velocity tracking to predict sprint completion

---

## Team Learnings & Insights

**Mohammad (Backend):**
- "JWT expiration handling was trickier than expected; learned importance of token refresh patterns"
- "Express middleware ordering matters; had to refactor auth flow mid-sprint"
- "MongoDB Atlas connection strings require careful handling with special characters"

**Prabhkrit (Frontend):**
- "React Vite dev server hot reload saved hours of debugging"
- "TailwindCSS utility-first approach made responsive design much faster"
- "Form validation on both frontend and backend is essential; caught XSS-like issues early"

**Samarjeet (DevOps/DB):**
- "Local MongoDB setup smooth, but Atlas firewall config took 2 hours to troubleshoot"
- "Index strategy on MongoDB critical for query performance; must plan early"
- "npm dependency conflicts resolved by using package-lock.json strictly"

---

## Unfinished Technical Debt

- Group creation frontend needs UI polish
- Add unit tests for authentication routes
- Implement input sanitization library (current: basic regex)
- Add request rate limiting for API

---

## Sprint 1 Summary

**Success Rate: 60% of planned stories completed (3 of 5)**

Despite Create Group and View Groups stories remaining incomplete, the team delivered:
- Fully working authentication system (production-ready)
- Functional expense tracker with real-time calculations
- Clean, responsive UI
- Documented, installable backend
- Professional demo video

The two unfinished stories are **critical for Sprint 2** and will be prioritized with higher team capacity allocation.

---

## Decisions Made During Retrospective

1. **Carry forward [2.1] and [2.2]** as highest priority for Sprint 2
2. **Allocate extra backend time** for group feature completion (8 hours for Mohammad)
3. **Start Sprint 2 with spike on group-level expense splitting** to clarify requirements
4. **Implement unit tests starting Sprint 2**
5. **Hold one weekly 30-minute sync** instead of all async (Thursdays 4pm EST)

---

## Next Steps for Sprint 2

- Complete Create Group and View Groups features
- Implement group member management (add/remove members)
- Add equal expense splitting algorithm
- Begin settlement suggestion logic
- Improve test coverage to 80%+

---

**Prepared by:** Group K  
**Date:** November 7, 2025  
**Sprint 1 Duration:** October 21 - November 3, 2025  
**Demo Video:** [SplitSmart_Demo_Sprint1.mp4](doc/sprint1)
