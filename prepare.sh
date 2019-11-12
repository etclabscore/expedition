# this builds :latest tag
docker build -t "etclabscore/jade-explorer" .
# this assigns :latest to proper semver tag
docker tag "etclabscore/jade-explorer" "etclabscore/jade-explorer:$1"
