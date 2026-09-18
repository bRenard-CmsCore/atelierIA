#!/usr/bin/env python3
"""
Simple task report generator.
Reads tasks from JSON and generates a text report.
"""

import json

# Load tasks
with open('tasks.json', 'r') as f:
    data = json.load(f)

# Build report
report = []
report.append("=" * 50 + "\n")
report.append("TASK REPORT\n")
report.append("=" * 50 + "\n\n")

report.append(f"Project: {data['project']}\n")
report.append(f"Created: {data['created_at']}\n")
report.append("\n")

# Count tasks by status
status_counts = {}
for task in data['tasks']:
    s = task['status']
    status_counts[s] = status_counts.get(s, 0) + 1

report.append("Summary:\n")
for s in sorted(status_counts.keys()):
    report.append(f"  - {s}: {status_counts[s]} task(s)\n")

report.append("\n")
report.append("Tasks:\n")
report.append("-" * 50 + "\n\n")

for task in data['tasks']:
    # Format task info
    status_str = task['status'].upper()
    priority_str = task['priority'].upper()

    report.append(f"[{status_str}] {task['title']}\n")
    report.append(f"  ID: {task['id']}\n")
    report.append(f"  Priority: {priority_str}\n")
    report.append(f"  Assignee: {task['assignee']}\n")
    report.append(f"  Description: {task['description']}\n")
    report.append("\n")

# Write report to file
with open('report.txt', 'w') as f:
    f.writelines(report)

print("✓ Report generated: report.txt")
print(f"✓ Total tasks: {len(data['tasks'])}")
