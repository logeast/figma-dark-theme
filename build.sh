#! /bin/bash

dist='dist'

rm -rf $dist && mkdir $dist

for file in 'html' 'css' 'js' 'images' 'manifest.json'; do
    echo ✤ Building $file to $dist
    cp -R $file $dist
done

echo
echo dist dir has those files: $(ls $dist)
echo
echo ✓ Build success.
