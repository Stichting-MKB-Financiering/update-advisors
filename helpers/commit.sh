#!/bin/sh

# read the commit message from the command line
commit_message=$1

# use git diff to compare the current version of organizations.json with the previous version
diff=$(git diff HEAD~1 organizations.json)

# parse the diff output and extract the names of the organizations that have been added
added_organization_names=$(echo "$diff" | grep '^\+' | grep '"tblPointOfInterestName":' | sed 's/^\+.*"tblPointOfInterestName": "\(.*\)",$/\1/')

# parse the diff output and extract the names of the organizations that have been removed
removed_organization_names=$(echo "$diff" | grep '^-' | grep '"tblPointOfInterestName":' | sed 's/^-.*"tblPointOfInterestName": "\(.*\)",$/\1/')

# add the added and removed organization names to the commit message
echo "$commit_message" > "$commit_message"
echo "" >> "$commit_message"
echo "Added organizations:" >> "$commit_message"
echo "$added_organization_names" | sed 's/^/  /' | sed 's/$/, /' >> "$commit_message"
echo "" >> "$commit_message"
echo "Removed organizations:" >> "$commit_message"
echo "$removed_organization_names" | sed 's/^/  /' | sed 's/$/, /' >> "$commit_message"

# use git commit to create a new commit with the updated commit message
git commit -a -F "$commit_message"
