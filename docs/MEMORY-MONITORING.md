# Memory Monitoring Guide

## How to detect leaks

1. Open DevTools (F12) → Memory tab
2. Click "Take heap snapshot"
3. Run the app for 5-10 minutes (open cards, filter, use map)
4. Take another snapshot
5. Compare: if memory keeps growing, there's a leak

## What to watch for

- Growing retained objects count
- Detached DOM nodes not being garbage collected
- Event listeners not being removed

## After changes

Run this after major refactors:
```bash
npm run test:e2e:headed
```

Then manually check memory in DevTools.

## Reference

- Detached DOM nodes are a common cause of leaks in JavaScript apps
- Always remove event listeners when cleaning up components
- Use `WeakMap` for caches that should be garbage collected
- Check that modal cleanup is working properly (see `cleanupModalScrollLock` and `cleanupModalClose`)

## Testing memory

To run the memory baseline test:
```bash
npm run test:e2e tests/memory-baseline.js
```

This will open the app and simulate normal usage, allowing you to monitor memory in DevTools.
