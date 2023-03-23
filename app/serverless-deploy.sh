DB_URI=$(grep "DATABASE_URI" .env.dev | cut -d "=" -f 2)

serverless deploy --aws-profile refri_serverless --param="DB=$DB_URI"
