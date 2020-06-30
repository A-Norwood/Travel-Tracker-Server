API="http://localhost:4741"
URL_PATH="/travel"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
   "travel": {
     "owner": "'"${OWNER}"'"
   }
 }'


echo
