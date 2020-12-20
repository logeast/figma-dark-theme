#! /bin/bash

# Color reset
nocolor='\033[0m' # Text Reset

# Regular colors
black='\033[0;30m'  # Black
red='\033[0;31m'    # Red
green='\033[0;32m'  # Green
yellow='\033[0;33m' # Yellow
blue='\033[0;34m'   # Blue
purple='\033[0;35m' # Purple
cyan='\033[0;36m'   # Cyan
white='\033[0;37m'  # White

dist='dist'
# Necessary files
files='html css js images manifest.json'

# Remove the last dist.
rm -rf $dist && mkdir $dist

# Copy necessary files to dist directory.
for file in $files; do
    echo ✤ Copying $file to $dist.
    cp -R $file $dist
done

echo
echo The dist directory now has those files.
echo -e ${cyan}$(ls $dist)${nocolor}
echo

echo -e The zip files to ${cyan}chrome-ext.zip${nocolor} and ${cyan}edge-ext.zip${nocolor}.
cd dist

# Judge zip command exit or not.
type zip >/dev/null 2>&1 || {
    echo -e ${red}✗ Oooops! Zip failed.${nocolor}
    echo
    echo >&2 "I require zip but it's not installed."
    echo You may install it with this or some other command.
    echo -e ${purple}sudo apt install zip${nocolor}
    echo
    exit 1
}

zip chrome-ext.zip $files
zip edge-ext.zip $files
echo

echo The dist directory now has those files.
echo -e ${cyan}$(ls)${nocolor}
echo

# End time(end - start))
echo -e ${green}✓ Congratulate! Build success.${nocolor}
