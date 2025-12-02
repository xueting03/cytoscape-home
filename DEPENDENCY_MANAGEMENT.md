# Dependency Management & Security Report

**Project**: Cytoscape Home  
**Last Updated**: 2025-12-02  
**Maintenance Policy**: Conservative updates (minor/patch)

---

## Executive Summary

This document tracks the dependency reengineering process and ongoing security posture of the project.

## TL;DR

- **Total Dependencies**: 31 packages (13 production, 18 development)
- **Security Vulnerabilities**: 2 moderate (development-only, non-blocking)
- **Last Full Update**: 2025-12-02
- **Build Status**: Passing
- **Test Status**: Passing

---

## Recent Reengineering (2025-12-02)

### Objectives
1. Update dependencies to latest compatible versions
2. Maintain backward compatibility (avoid breaking changes)
3. Address security vulnerabilities where feasible
4. Document remaining risks

### Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Outdated Packages** | 16 | 0 | -100% |
| **Security Vulnerabilities** | 8 | 2 | -75% |
| **High Severity Issues** | 4 | 0 | -100% |
| **Production Vulnerabilities** | 3 | 0 | -100% |

### Updated Packages

#### Production Dependencies (11 updates)
- `@headlessui/react`: 2.0.4 → 2.2.9
- `@headlessui/tailwindcss`: 0.2.0 → 0.2.2
- `@js4cytoscape/ndex-client`: 0.3.2 → 0.4.3-alpha.12
- `@tailwindcss/forms`: 0.5.7 → 0.5.10
- `@tanstack/react-query`: 5.83.0 → 5.90.11
- `clsx`: 2.1.0 → 2.1.1
- `cytoscape`: 3.30.0 → 3.33.1
- `framer-motion`: 11.0.5 → 11.18.2
- `minisearch`: 7.1.2 → 7.2.0
- `react` + `react-dom`: 18.2.0 → 18.3.1
- `use-debounce`: 10.0.0 → 10.0.6

#### Development Dependencies (11 updates)
- `@types/react`: 18.2.43 → 18.3.27
- `@types/react-dom`: 18.2.17 → 18.3.7
- `@vitejs/plugin-react`: 4.2.1 → 4.7.0
- `autoprefixer`: 10.4.17 → 10.4.22
- `eslint`: 8.55.0 → 8.57.1
- `eslint-plugin-react`: 7.33.2 → 7.37.5
- `eslint-plugin-react-hooks`: 4.6.0 → 4.6.2
- `eslint-plugin-react-refresh`: 0.4.5 → 0.4.24
- `postcss`: 8.4.33 → 8.5.6
- `tailwindcss`: 3.4.4 → 3.4.18
- `vite`: 5.0.8 → 5.4.21

---

## Security Assessment

### Resolved Vulnerabilities

#### axios (via @js4cytoscape/ndex-client) - **FIXED**

**Previous Issues** (High Severity):
- CSRF vulnerability ([GHSA-wf5p-g6vw-rhxx](https://github.com/advisories/GHSA-wf5p-g6vw-rhxx))
- DoS attack via data size ([GHSA-4hjh-wcwx-xvwj](https://github.com/advisories/GHSA-4hjh-wcwx-xvwj))
- SSRF credential leakage ([GHSA-jr5f-v2jv-69x6](https://github.com/advisories/GHSA-jr5f-v2jv-69x6))

**Resolution**:
- Upgraded `@js4cytoscape/ndex-client` from `0.3.2` to `0.4.3-alpha.12`
- Now uses `axios@1.13.2` (all vulnerabilities patched)
- Stable for 9+ months, API-compatible with old version  
- **Impact**: Eliminated all production security vulnerabilities

**Code Usage**: `src/app/shared/queryOptions.js` (NDEx network search only)

---

### Accepted Risks (Development Only)

#### esbuild (via vite) - **ACCEPTED**

**Status**: ACCEPTED RISK (Development Environment Only)  
**Severity**: Moderate  
**CVE**: [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99)

**Issue**: 
Development server can be accessed by malicious websites to read responses.

**Why This Is Low Risk**:
1. **Development Only**: Does not affect production builds
2. **Local Environment**: Dev server runs on localhost/private networks
3. **Temporary**: Dev servers are ephemeral, not long-running
4. **Not Exposed**: Never deployed to production or public internet

**Why Not Fixed**:
- Fix requires upgrading Vite 5 → Vite 7 (major version jump)
- Breaking changes would require code modifications
- Risk/benefit analysis favors stability over fixing dev-only issue

**Mitigation**:
- Never expose dev server to public internet
- Use production builds (`npm run build`) for any public deployments
- Keep dev server on localhost or trusted private networks

**Future Plan**:
- Schedule Vite 7 migration as a dedicated sprint
- Will resolve this issue as part of broader framework update

---

## Dependency Management Policy

### Update Strategy

| Update Type | Policy | Frequency |
|-------------|--------|-----------|
| **Patch** (x.y.Z) | Auto-update | Monthly |
| **Minor** (x.Y.z) | Review & update | Quarterly |
| **Major** (X.y.z) | Planned migration | As needed |
| **Security** | Immediate review | On disclosure |

### Decision Framework

When evaluating dependency updates:

1. **Security First**: Address high/critical vulnerabilities immediately
2. **Stability Second**: Prefer stable releases over bleeding-edge
3. **Compatibility Third**: Avoid breaking changes unless necessary
4. **Context Matters**: Assess actual risk, not just CVE scores

**Alpha/Beta Policy:** Only if:  
- Stable for 6+ months  
- Fixes critical security issues  
- Maintains API compatibility  
- Maintained by reputable devs  
- Not a core framework dependency  

---

## Monitoring & Maintenance

### Regular Tasks

- [ ] **Monthly**: Run `npm outdated` and `npm audit`
- [ ] **Quarterly**: Update patch/minor versions
- [ ] **Annually**: Review major version upgrades
- [ ] **On CVE**: Assess and respond to security advisories

### Audit Commands

```bash
# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit

# Update patch/minor versions safely
npm update

# View dependency tree
npm list --depth=1
```

### Key Metrics to Track

1. **Outdated Packages**: Target < 5
2. **Security Vulnerabilities**: Target 0 high/critical
3. **Build Time**: Baseline ~7s (monitor for regression)
4. **Bundle Size**: Baseline ~500KB (watch for bloat)

---

## Emergency Procedures

### If a Critical Vulnerability Is Discovered

1. **Assess Impact**: Review actual code usage and attack surface
2. **Check Fix Availability**: Look for patched versions
3. **Evaluate Options**:
   - Upgrade to patched version (preferred)
   - Apply workaround/mitigation
   - Replace dependency if necessary
4. **Test Thoroughly**: Run full test suite and manual QA
5. **Document**: Update this file with resolution
6. **Deploy**: Fast-track to production if needed

### Rollback Procedure

If an update causes issues:

```bash
# Restore previous package-lock.json from git
git checkout HEAD~1 package-lock.json

# Reinstall previous versions
npm ci

# Verify functionality
npm run build && npm run dev
```

---

## Resources

- **npm Documentation**: https://docs.npmjs.com/
- **Security Advisories**: https://github.com/advisories
- **Dependency Graph**: `npm list` or GitHub Insights
- **Update Tool**: `npm-check-updates` (optional)

---

## Changelog

### 2025-12-02 - Major Reengineering
- Updated 22 dependencies (11 production, 11 development)
- Fixed all high-severity vulnerabilities
- Reduced total vulnerabilities by 75%
- Documented accepted risks
- Established dependency management policy

---
2025/12/02 v1.0
