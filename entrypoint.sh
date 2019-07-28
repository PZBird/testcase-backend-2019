#!/bin/sh

if [ $# -eq 0 ]
then
    echo "Auto run"
    echo "Done migration"
    exec npm start
else
    echo "Custom run"
    $@
fi
