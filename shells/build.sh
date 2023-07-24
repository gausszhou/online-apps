pnpm i

pnpm --filter @gausszhou/music build
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "pnpm success in $time"

pnpm --filter @gausszhou/todos build
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "pnpm success in $time"

touch ./dist/README.md
echo "# Apps" > ./dist/README.md