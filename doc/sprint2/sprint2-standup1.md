## Sprint 2 Planning & Review Meeting — November 7, 2025

**Date:** Friday, November 7, 2025  
**Time:** 2:00 PM – 3:30 PM EST  
**Location:** In person  
**Attendees:**  
- Mohammad Areeb ✅  
- Prabhkrit Singh ✅  
- Samarjeet Singh ✅  

### Agenda:
- Sprint 1 retrospective (what went well, what could be improved, grading rubric)
- Review of incomplete stories ([2.1] Create Group, [2.2] View Groups List) and blockers
- Discussion and planning for Sprint 2 user stories
- Assignment of responsibilities for group features and expense splitting
- Identification of spikes and risks

---

### Meeting Notes:

#### 1. Sprint 1 Retrospective Quick Review
- All agreed user authentication and expense tracker were robust and stable
- Some underestimation on group story complexity
- Need for earlier integration testing noted
- Consensus to continue using async standups and code review process

#### 2. Incomplete Stories and Issues
- [2.1] Create Group: Backend endpoints 80% done, frontend integration still missing modal/form validation; under-estimated communication complexity
- [2.2] View Groups List: Backend ready, frontend not yet connected; primarily blocked by Create Group
- Decision to complete both as first priority Sprint 2

#### 3. Sprint 2 user stories voted in:
- Add Members to Group (admin invite flow)
- View Group Members
- Equal expense splitting logic (basic)
- Remove member from group (stretch goal if ahead)

#### 4. Task Breakdown/Assignees
- Mohammad (Backend): group endpoints, splitting logic
- Prabhkrit (Frontend): UI for group creation, list, members, splitting view
- Samarjeet (DB/DevOps): DB indexes/optimizations, in-app notifications setup

#### 5. Risks/Spikes
- Equal split calculation (precision/rounding)
- Real-time balance updates—try polling, explore WebSocket if needed

#### 6. Actions & Next Meetings
- Recurring standups: Daily async (#splitsmart-standup on Discord)
- Weekly sync: Thursdays 4pm on campus/in Discord
- Next in-person: Thursday, Nov 14, 2025, 4pm

---

**Note:**  
This sprint plan and user story assignment **is not set in stone**. The team may revise priorities, assignments, or scope **as the project evolves and new challenges or requirements emerge**. All changes will be documented in future meeting notes.

---

**Summary/Decisions:**  
- Sprint 1 retro and Sprint 2 planning were held together for efficiency.
- All participants were present and actively contributed.
- Meeting minutes saved to `docs/sprint2/meeting-notes.md`.
- Reference made in SR1.md and sprint2.md for TA grading/compliance.
