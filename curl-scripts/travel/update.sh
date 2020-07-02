API="http://localhost:4741"
URL_PATH="/travel"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "travel": {
      "location": "'"${LOCATION}"'",
      "date": "'"${DATE}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo

# token 5a3b5b70740280e7b3fb585849f6e259
# id 5efcf5e56824bd46aba910ff
