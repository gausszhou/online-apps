pnpm i

rm -rf dist

pnpm --filter @gausszhou/todos build
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "pnpm success in $time"

pnpm --filter @gausszhou/tools build
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "pnpm success in $time"

pnpm --filter @gausszhou/music build
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "pnpm success in $time"

pnpm --filter @gausszhou/desktop build
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "pnpm success in $time"

pnpm --filter @gausszhou/tiktok build
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "pnpm success in $time"

cp README.md ./dist/README.md

# compress
echo "compress start in $time"
node scripts/compress.js
time=$(date "+%Y-%m-%d %H:%M:%S")
echo "compress success in $time"