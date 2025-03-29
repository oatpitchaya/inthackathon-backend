run:
	npm run start

migrateup:
	npx prisma migrate dev --name init
	npx prisma generate

.PHONY: .migrateup
