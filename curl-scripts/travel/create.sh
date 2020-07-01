API="http://localhost:4741"
URL_PATH="/travel"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "travel": {
      "location": "'"${LOCATION}"'",
      "date": "'"${DATE}"'"
    }
  }'

echo
