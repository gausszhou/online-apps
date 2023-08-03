pnpm i

pnpm --filter @gausszhou/music build
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "pnpm success in $time"

pnpm --filter @gausszhou/todos build
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "pnpm success in $time"

pnpm --filter @gausszhou/tools build
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "pnpm success in $time"

pnpm --filter @gausszhou/desktop build
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "pnpm success in $time"


cp README.md ./dist/README.md
