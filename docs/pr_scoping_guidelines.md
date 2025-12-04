# Pull Request Scoping & Review Guidelines

## Purpose
This document provides a standard approach for **scoping and reviewing pull requests (PRs)**. Proper scoping improves review speed, reduces errors, and enhances developer experience.

---

## PR Scoping Pattern

Each pull request should include the following sections:

### 1. Addressed Issue
Describe the problem or technical debt that this PR resolves. Include references to issues, bugs, or feature requests. 

---

### 2. What Has Been Reengineered
Summarize key changes in functional areas. 

---

### 3. Reengineering Strategy and Approach Used
For each major change, describe:

- **Strategy**: Rewrite, Rework, or Evolutionary
- **Approach**: Partial, Evolutionary, or Full
- **Steps**:
  1. Reverse: Analyze existing code and patterns
  2. Restructuring: Refactor or abstract
  3. Forward: Implement improved design while preserving functionality

---

### 4. AI Assistance
If applicable, note any AI tools used

---

### 5. Impact of Changes
Include measurable or observable improvements:

---

### 6. Review Checklist
Use this checklist for PR review:

- [ ] Does the PR address a clear issue or feature?
- [ ] Are all changes scoped and modular?
- [ ] Are tests included and passing?
- [ ] Is documentation updated if needed?
- [ ] Are security and error handling improvements verified?