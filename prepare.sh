# this builds :latest tag
docker build -t "etclabscore/expedition" .
# this assigns :latest to proper semver tag
docker tag "etclabscore/expedition" "etclabscore/expedition:$1"
