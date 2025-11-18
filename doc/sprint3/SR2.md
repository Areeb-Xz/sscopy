# SR2.md — Sprint 2 Retrospective

## Team: Group K (SplitSmart)

- Mohammad Areeb (Backend Developer)
- Prabhkrit Singh (Frontend Developer)
- Samarjeet Singh (Database & DevOps Engineer)

---

## Retrospective Meeting Details

- **Date:** November 17, 2025
- **Time:** 11:00 AM - 1:00 PM EST
- **Format:** In-person meeting
- **Location:** York University campus
- **All members participated:** YES ✅

---

## Sprint Goal Recap

Enable group collaboration features with member management, group listing, and equal expense splitting.

---

## Sprint Outcomes

### Completed Stories (24 SP)
- ✅ **[2.1] Create Group** — 5 SP
- ✅ **[2.2] View Groups List** — 3 SP
- ✅ **[2.3] Add Members to Group** — 5 SP
- ✅ **[2.4] View Group Members** — 3 SP
- ✅ **[2.5] Equal Expense Splitting** — 8 SP

### Key Deliverables
**Backend:**
- Create/view groups API with validation
- Add/view members API with email search
- Equal splitting algorithm with decimal precision
- Test coverage: 82% (up from 70%)

**Frontend:**
- Groups list and detail pages
- Add members modal with search
- Equal expense form with real-time calculations
- Test coverage: 75% (up from 60%)

**DevOps:**
- MongoDB indexes (40% performance improvement)
- Production environment stable
- CI/CD pipeline updated

### Demo Video
- **Date:** November 17, 2025, 10:00 AM EST
- **Duration:** ~3 minutes
- All core features demonstrated

---

## Sprint Metrics

| Metric | Sprint 2 | Sprint 1 | Change |
|--------|----------|----------|--------|
| Stories Completed | 5 | 3 | +2 |
| Story Points | 24 SP | 13 SP | +85% |
| Velocity | 12 SP/week | 6.5 SP/week | +85% |
| Backend Coverage | 82% | 70% | +12% |
| Frontend Coverage | 75% | 60% | +15% |

**Success:** Exceeded target of 16-18 SP by 33%

---

## What Went Well 👍

1. **Weekly Sync Meetings** - Thursday 4pm syncs eliminated miscommunication
2. **Improved Estimates** - 20% buffer worked; all stories completed on time
3. **Early Integration Testing** - Started Day 7 instead of last minute
4. **Test Coverage** - Both backend and frontend exceeded targets
5. **GitHub Workflow** - PR templates and ticket IDs in commits worked perfectly
6. **Database Optimization** - Early indexing prevented performance issues

---

## Challenges & Improvements ⚠️

1. **Demo Timing** - Morning recording conflicted with exam prep
   - **Action:** Schedule demo 2 days before deadline next sprint

2. **Component Duplication** - Modals had repeated code
   - **Action:** Refactor reusable components in Sprint 3 Week 1

3. **API Error Format** - Inconsistent error responses
   - **Action:** Standardize with error middleware

4. **Schema Changes** - Added `joinedAt` field mid-sprint
   - **Action:** DB schema review in Sprint 3 planning

---

## Practices to Continue 🔄

- ✅ Weekly Thursday 4pm sync meetings
- ✅ GitHub PR workflow with templates
- ✅ API contract-first design with Postman
- ✅ Integration testing by Day 7
- ✅ 20% estimation buffer

---

## Practices to Start ✨

- Automated API tests in CI/CD
- Component library documentation
- Technical debt tracking in Trello
- Error response standardization
- Database migration scripts

---

## Team Learnings

**Mohammad:** "Equal splitting algorithm simpler after spike session; group access middleware saved hours"

**Prabhkrit:** "React Testing Library intuitive; should have abstracted modals earlier"

**Samarjeet:** "Early indexing crucial; MongoDB Compass explain plans very helpful"

---

## Technical Debt

**High Priority (Sprint 3):**
1. Refactor modal/form components (4h)
2. Standardize API error responses (3h)
3. Database migration system (4h)
4. Add E2E tests with Cypress (8h)

---

## Decisions Made

1. Defer [2.6] Remove Member to Sprint 3 as highest priority
2. Schedule Sprint 3 demo for Nov 30 (not Dec 1)
3. Standardize error responses before new features
4. Add Trello card template with required fields
5. Spike session on settlement algorithm Week 1 of Sprint 3

---

## Sprint 2 Summary

**Success Rate: 100% of planned stories completed (5 of 5)**

The team delivered all core group features with:
- 85% velocity increase from Sprint 1
- Zero critical bugs at demo
- Professional, polished user experience
- Strong test coverage across stack

Sprint 2 was highly successful. Team is ready for Sprint 3 with refined processes and strong momentum.

---

**Prepared by:** Group K  
**Date:** November 17, 2025  
**Sprint Duration:** November 7 - November 17, 2025  
**Demo Video:** [Link to be added]