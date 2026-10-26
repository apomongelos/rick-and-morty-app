#!/usr/bin/env bash

# Prints the "What's Changed" release notes (PRs merged since the previous release
# of the same series) as Markdown, with Jira keys turned into links.
#
# The previous release is looked up by tag prefix (e.g. "android-stage-v"), so each
# platform + environment series is compared only against itself.
#
# Usage:
#   scripts/release-notes.sh <tag-prefix> <new-tag> <target-sha>
#
# Env:
#   GH_TOKEN, GITHUB_REPOSITORY   provided by GitHub Actions
#   JIRA_BASE_URL                 optional, e.g. https://fernando-mongelos.atlassian.net
#   JIRA_PROJECT_KEY              optional, e.g. RM (both needed to link Jira keys)

set -euo pipefail

if [ $# -ne 3 ]; then
  echo "Usage: $0 <tag-prefix> <new-tag> <target-sha>" >&2
  exit 1
fi

TAG_PREFIX=$1
NEW_TAG=$2
TARGET_SHA=$3
REPO=${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is not set}

# Releases come newest first, so the first match is the previous release of this series
PREV_TAG=$(gh api "repos/$REPO/releases?per_page=100" \
  --jq "[.[] | select(.tag_name | startswith(\"$TAG_PREFIX\"))][0].tag_name // empty")

ARGS=(-f tag_name="$NEW_TAG" -f target_commitish="$TARGET_SHA")
if [ -n "$PREV_TAG" ]; then
  ARGS+=(-f previous_tag_name="$PREV_TAG")
fi

NOTES=$(gh api "repos/$REPO/releases/generate-notes" "${ARGS[@]}" --jq .body)

# KEY-123 -> [KEY-123](https://your-site.atlassian.net/browse/KEY-123)
if [ -n "${JIRA_BASE_URL:-}" ] && [ -n "${JIRA_PROJECT_KEY:-}" ]; then
  NOTES=$(printf '%s\n' "$NOTES" | JIRA_URL="${JIRA_BASE_URL%/}" perl -pe \
    's/\b(\Q$ENV{JIRA_PROJECT_KEY}\E-\d+)\b/[$1]($ENV{JIRA_URL}\/browse\/$1)/g')
fi

printf '%s\n' "$NOTES"
