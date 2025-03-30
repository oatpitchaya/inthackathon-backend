run:
	npm run start

migrateup:
	npx prisma migrate dev --name init
	npx prisma generate

seed:
	npx ts-node prisma/seed.ts

.PHONY: .migrateup
